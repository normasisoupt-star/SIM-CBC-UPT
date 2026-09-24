import os
import json
import urllib.request
import ssl
import sys
import re
import math
import unicodedata
from collections import deque

# Ensure UTF-8 output encoding for console prints on Windows
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except:
        pass

# Bypass SSL verification
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

try:
    from pypdf import PdfReader
except ImportError:
    print("Error: pypdf is not installed. Please install it first.")
    sys.exit(1)

docs_dir = r"C:\Users\GECA\.gemini\antigravity\scratch\sigeca\sunedu_docs"
os.makedirs(docs_dir, exist_ok=True)

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36'
}

def extract_json_arrays(decoded_html):
    # Find all AF_initDataCallback blocks
    callback_matches = re.finditer(r'AF_initDataCallback\(\{', decoded_html)
    arrays = []
    
    for m in callback_matches:
        start_pos = m.end() - 1 # starts at {
        # Count curly braces to find the end of callback object
        count = 0
        end_pos = start_pos
        for i in range(start_pos, len(decoded_html)):
            if decoded_html[i] == '{':
                count += 1
            elif decoded_html[i] == '}':
                count -= 1
                if count == 0:
                    end_pos = i
                    break
        
        callback_str = decoded_html[start_pos:end_pos+1]
        
        # Now find data: inside this callback object
        data_idx = callback_str.find('data:')
        if data_idx != -1:
            brace_start = callback_str.find('[', data_idx)
            if brace_start != -1:
                # Count matching brackets to extract exact array
                b_count = 0
                arr_end = brace_start
                for idx in range(brace_start, len(callback_str)):
                    if callback_str[idx] == '[':
                        b_count += 1
                    elif callback_str[idx] == ']':
                        b_count -= 1
                        if b_count == 0:
                            arr_end = idx
                            break
                arrays.append(callback_str[brace_start:arr_end+1])
                
    return arrays

def scrape_folder_items(folder_id):
    url = f"https://drive.google.com/drive/folders/{folder_id}"
    print(f"Scraping Drive folder URL: {url} ...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ctx) as response:
            html = response.read().decode('utf-8', errors='ignore')
    except Exception as e:
        print(f"Failed to fetch folder {folder_id}: {e}")
        return set(), set()
        
    # Decode hex escapes in the HTML script tag data
    decoded = html.replace('\\x22', '"').replace('\\x5b', '[').replace('\\x5d', ']')
    decoded = decoded.replace('\\x2f', '/').replace('\\x3d', '=')
    
    arrays = extract_json_arrays(decoded)
    print(f"Found {len(arrays)} data arrays in folder page HTML")
    
    files = []
    folders = []
    
    # Recursive scanner to find items in JSON
    def scan_list(lst):
        if isinstance(lst, list):
            # Check if lst looks like a Google Drive item record:
            # lst[0] is a list of length 2: [None, "ID"] (where ID is 33 base64 characters)
            if len(lst) >= 5 and isinstance(lst[0], list) and len(lst[0]) == 2 and lst[0][0] is None and isinstance(lst[0][1], str) and len(lst[0][1]) == 33:
                item_id = lst[0][1]
                mime = lst[4]
                
                if isinstance(mime, str) and (mime.startswith('application/') or mime == 'text/plain'):
                    # Find the name of the file or folder
                    name = None
                    def find_name(sub):
                        nonlocal name
                        if name is not None:
                            return
                        if isinstance(sub, list):
                            if len(sub) == 1 and isinstance(sub[0], list) and len(sub[0]) == 3 and isinstance(sub[0][0], str) and sub[0][1] is None and sub[0][2] == 1:
                                name = sub[0][0]
                                return
                            if len(sub) > 0 and isinstance(sub[0], list):
                                for item in sub:
                                    find_name(item)
                            else:
                                for item in sub:
                                    find_name(item)
                        elif isinstance(sub, dict):
                            for k, v in sub.items():
                                find_name(v)
                                
                    find_name(lst)
                    if name:
                        if mime == "application/vnd.google-apps.folder":
                            folders.append((name, item_id))
                        elif mime == "application/pdf" or name.lower().endswith(".pdf"):
                            files.append((name, item_id))
                            
            for item in lst:
                scan_list(item)
        elif isinstance(lst, dict):
            for k, v in lst.items():
                scan_list(v)
                
    for arr_str in arrays:
        try:
            arr_json = json.loads(arr_str)
            scan_list(arr_json)
        except Exception as e:
            pass
            
    return set(files), set(folders)

# BFS Crawler
root_folder_id = "11bfTGtNcGaAyf8wkVVNcOqdkEPBAR8Jb"
queue = deque([(root_folder_id, "Root")])
visited_folders = {root_folder_id}

all_discovered_files = {} # maps filename -> file_id

while queue:
    curr_id, curr_name = queue.popleft()
    print(f"\n========================================\nCrawling folder: '{curr_name}' (ID: {curr_id})...\n========================================")
    
    files, folders = scrape_folder_items(curr_id)
    print(f"Found {len(files)} files and {len(folders)} subfolders in '{curr_name}'")
    
    for fname, fid in files:
        if fname not in all_discovered_files:
            all_discovered_files[fname] = fid
            print(f"  Discovered File: '{fname}' (ID: {fid})")
            
    for sub_name, sub_id in folders:
        if sub_id not in visited_folders:
            visited_folders.add(sub_id)
            queue.append((sub_id, sub_name))
            print(f"  Enqueued Subfolder: '{sub_name}' (ID: {sub_id})")

print(f"\nTotal unique PDF files discovered recursively: {len(all_discovered_files)}")

# Download all unique files discovered
resolutions_data = []

for filename, file_id in all_discovered_files.items():
    filepath = os.path.join(docs_dir, filename)
    print(f"\nProcessing file: {filename}...")
    
    # Download file if it doesn't exist (or always download to refresh)
    url = f"https://docs.google.com/uc?export=download&id={file_id}"
    try:
        print(f"  Downloading from: {url}")
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, context=ctx) as response:
            with open(filepath, "wb") as f:
                f.write(response.read())
        print(f"  Downloaded successfully to: {filepath}")
        
        # Parse PDF using pypdf
        reader = PdfReader(filepath)
        pages_list = []
        for p_idx, page in enumerate(reader.pages, 1):
            text = page.extract_text() or ""
            pages_list.append({
                "nro": p_idx,
                "texto": text
            })
        
        resolutions_data.append({
            "id": file_id,
            "filename": filename,
            "title": filename.replace("_", " ").replace(".pdf", ""),
            "paginas": pages_list
        })
        print(f"  Parsed {len(reader.pages)} pages")
        
    except Exception as e:
        print(f"  Failed to process {filename}: {e}")

# Write resolutions index to disk
output_json_path = r"C:\Users\GECA\.gemini\antigravity\scratch\sigeca\sunedu_resolutions.json"
try:
    with open(output_json_path, "w", encoding="utf-8") as f:
        json.dump(resolutions_data, f, ensure_ascii=False, indent=2)
    print(f"\nSuccessfully compiled all resolutions ({len(resolutions_data)} files) into {output_json_path}!")
except Exception as e:
    print(f"Error writing resolutions JSON: {e}")
