/* ==========================================================================
   SIGECA - SERVICIO DE ANÁLISIS ESTADÍSTICO DE DESERCIÓN Y REZAGO
   ========================================================================== */

import { db } from "./db.js?v=20260720.1";

export class AnalyticsService {
  /**
   * Obtiene la lista de semestres válidos del periodo histórico estricto (2022-I a la fecha)
   */
  static async getHistoricalSemesters() {
    const stats = await db.getEstadisticasInstitucionales();
    const egr = stats.egresados || [];
    const ing = stats.ingresantes || [];
    const reg = stats.alumnos_regulares || [];

    const semesters = [...new Set([
      ...egr.map(x => x.semestre),
      ...ing.map(x => x.semestre),
      ...reg.map(x => x.semestre)
    ])].filter(s => String(s) >= "2022-I").sort();

    return semesters;
  }

  /**
   * Calcula la Tasa de Deserción Aparente Semestral considerando flujo de matriculados continuantes:
   * Tasa Deserción Semestral (%) = ((Matriculados(t-1) - (Matriculados(t) - Ingresantes(t) + Egresados(t-1))) / Matriculados(t-1)) * 100
   */
  static async calculateDesercion(semestre, facultad = "Todos", carrera = "Todos") {
    const stats = await db.getEstadisticasInstitucionales();
    const rawIng = stats.ingresantes || [];
    const rawReg = stats.alumnos_regulares || [];
    const rawEgr = stats.egresados || [];

    const allSemesters = [...new Set([
      ...rawIng.map(x => x.semestre),
      ...rawReg.map(x => x.semestre),
      ...rawEgr.map(x => x.semestre)
    ])].sort();

    const idx = allSemesters.indexOf(semestre);
    if (idx <= 0) {
      return { semestre, prevSemestre: null, facultad, carrera, ingresantes: 0, matriculados: 0, egresadosPrev: 0, desertores: 0, tasaDesercion: 0.0 };
    }

    const prevSemestre = allSemesters[idx - 1];

    const filterFn = (r) => {
      const matchFac = (facultad === "Todos" || r.Facultad === facultad);
      const matchCar = (carrera === "Todos" || r.Programa === carrera);
      return matchFac && matchCar;
    };

    const getQty = (dataset, sem) => {
      const entry = dataset.find(x => x.semestre === sem);
      if (!entry) return 0;
      return (entry.rows || []).filter(filterFn).reduce((s, r) => s + (r.Cantidad || 0), 0);
    };

    const m_t1 = getQty(rawReg, prevSemestre);
    const e_t1 = getQty(rawEgr, prevSemestre);
    const i_t = getQty(rawIng, semestre);
    const m_t = getQty(rawReg, semestre);

    const continuantes = Math.max(0, m_t - i_t);
    const desertoresAparentes = Math.max(0, m_t1 - (m_t - i_t + e_t1));
    const tasaDesercionAparente = m_t1 > 0 ? Math.min(100, Math.max(0, (desertoresAparentes / m_t1) * 100)) : 0;

    return {
      semestre,
      prevSemestre,
      facultad,
      carrera,
      matriculadosPrev: m_t1,
      egresadosPrev: e_t1,
      ingresantes: i_t,
      matriculados: m_t,
      continuantes,
      denominador: m_t1,
      desertores: desertoresAparentes,
      tasaDesercion: parseFloat(tasaDesercionAparente.toFixed(2))
    };
  }

  /**
   * Calcula el índice de rezago / estancamiento (Matriculados - Egresados)
   */
  static async calculateRezago(semestre, facultad = "Todos", carrera = "Todos") {
    const stats = await db.getEstadisticasInstitucionales();
    const rawReg = stats.alumnos_regulares || [];
    const rawEgr = stats.egresados || [];

    const semReg = (rawReg.find(x => x.semestre === semestre) || {}).rows || [];
    const semEgr = (rawEgr.find(x => x.semestre === semestre) || {}).rows || [];

    const filterFn = (r) => {
      const matchFac = (facultad === "Todos" || r.Facultad === facultad);
      const matchCar = (carrera === "Todos" || r.Programa === carrera);
      return matchFac && matchCar;
    };

    const matriculadosCount = semReg.filter(filterFn).reduce((s, r) => s + (r.Cantidad || 0), 0);
    const egresadosCount = semEgr.filter(filterFn).reduce((s, r) => s + (r.Cantidad || 0), 0);

    const rezagadosAbs = Math.max(0, matriculadosCount - egresadosCount);
    const tasaRezago = matriculadosCount > 0 ? Math.min(100, Math.max(0, ((matriculadosCount - egresadosCount) / matriculadosCount) * 100)) : 0;

    return {
      semestre,
      facultad,
      carrera,
      matriculados: matriculadosCount,
      egresados: egresadosCount,
      rezagados: rezagadosAbs,
      tasaRezago: parseFloat(tasaRezago.toFixed(2))
    };
  }

  /**
   * Genera la comparativa entre facultades (máximo 4) para gráficos de barras agrupadas
   */
  static async getFacultyComparisonData(selectedFaculties, semestre) {
    const result = [];
    for (const fac of selectedFaculties) {
      const des = await this.calculateDesercion(semestre, fac, "Todos");
      const rez = await this.calculateRezago(semestre, fac, "Todos");
      result.push({
        facultad: fac,
        desercionTasa: des.tasaDesercion,
        desercionAbs: des.desertores,
        rezagoTasa: rez.tasaRezago,
        rezagoAbs: rez.rezagados,
        egresados: des.egresados,
        matriculados: rez.matriculados
      });
    }
    return result;
  }

  /**
   * Genera el ranking de carreras por estancamiento / cuello de botella
   */
  static async getCareerRezagoRanking(facultad = "Todos", semestre) {
    const stats = await db.getEstadisticasInstitucionales();
    const rawEgr = stats.egresados || [];
    const semEgr = (rawEgr.find(x => x.semestre === semestre) || {}).rows || [];

    let programs = [...new Set(semEgr.map(r => r.Programa))];
    if (facultad !== "Todos") {
      programs = [...new Set(semEgr.filter(r => r.Facultad === facultad).map(r => r.Programa))];
    }

    const ranking = [];
    for (const prog of programs) {
      const facName = (semEgr.find(r => r.Programa === prog) || {}).Facultad || "N/A";
      const des = await this.calculateDesercion(semestre, facName, prog);
      const rez = await this.calculateRezago(semestre, facName, prog);
      ranking.push({
        programa: prog,
        facultad: facName,
        desercionTasa: des.tasaDesercion,
        rezagoTasa: rez.tasaRezago,
        matriculados: rez.matriculados,
        egresados: rez.egresados
      });
    }

    ranking.sort((a, b) => b.rezagoTasa - a.rezagoTasa);
    return ranking;
  }
}
