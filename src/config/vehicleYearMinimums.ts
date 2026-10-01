import { readFileSync } from 'node:fs';
import path from 'node:path';

type VehicleYearMinimumCatalog = Record<string, Record<string, number | null>>;

const catalogPath = path.resolve(process.cwd(), 'public/data/vehicleYearMinimums.json');
const vehicleYearMinimums = JSON.parse(readFileSync(catalogPath, 'utf8')) as VehicleYearMinimumCatalog;

function normalize(value: string): string {
  return value.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export function getVehicleYearMinimum(brand: string, model: string) {
  const brandEntry = Object.entries(vehicleYearMinimums).find(([name]) => normalize(name) === normalize(brand));
  if (!brandEntry) return null;

  const modelEntry = Object.entries(brandEntry[1]).find(([name]) => normalize(name) === normalize(model));
  if (!modelEntry || modelEntry[1] === null) return null;

  return {
    brand: brandEntry[0],
    model: modelEntry[0],
    year: modelEntry[1],
  };
}

export function getVehicleModelMismatch(brand: string, model: string) {
  const catalogBrand = Object.keys(vehicleYearMinimums).find((name) => normalize(name) === normalize(brand));
  if (!catalogBrand) return null;

  const matchingModels = Object.entries(vehicleYearMinimums).flatMap(([catalogBrand, models]) => {
    const catalogModel = Object.keys(models).find((name) => normalize(name) === normalize(model));
    return catalogModel ? [{ brand: catalogBrand, model: catalogModel }] : [];
  });

  if (!matchingModels.length || matchingModels.some((entry) => normalize(entry.brand) === normalize(brand))) {
    return null;
  }

  return { ...matchingModels[0], requestedBrand: catalogBrand };
}
