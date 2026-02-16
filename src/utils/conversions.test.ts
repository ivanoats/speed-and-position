import { describe, it, expect } from 'vitest';
import {
  metersPerSecToMph,
  metersPerSecToKph,
  METERS_PER_SEC_TO_MPH,
  METERS_PER_SEC_TO_KPH,
} from './conversions';

describe('conversions', () => {
  describe('constants', () => {
    it('has correct MPH conversion factor', () => {
      expect(METERS_PER_SEC_TO_MPH).toBe(2.23694);
    });

    it('has correct KPH conversion factor', () => {
      expect(METERS_PER_SEC_TO_KPH).toBe(3.6);
    });
  });

  describe('metersPerSecToMph', () => {
    it('converts 0 m/s to 0 mph', () => {
      expect(metersPerSecToMph(0)).toBe(0);
    });

    it('converts 10 m/s to approximately 22.4 mph', () => {
      const result = metersPerSecToMph(10);
      expect(result).toBeCloseTo(22.3694, 2);
    });

    it('converts 20 m/s to approximately 44.7 mph', () => {
      const result = metersPerSecToMph(20);
      expect(result).toBeCloseTo(44.7388, 2);
    });

    it('handles decimal values', () => {
      const result = metersPerSecToMph(15.5);
      expect(result).toBeCloseTo(34.6726, 2);
    });
  });

  describe('metersPerSecToKph', () => {
    it('converts 0 m/s to 0 kph', () => {
      expect(metersPerSecToKph(0)).toBe(0);
    });

    it('converts 10 m/s to 36 kph', () => {
      expect(metersPerSecToKph(10)).toBe(36);
    });

    it('converts 20 m/s to 72 kph', () => {
      expect(metersPerSecToKph(20)).toBe(72);
    });

    it('handles decimal values', () => {
      const result = metersPerSecToKph(15.5);
      expect(result).toBeCloseTo(55.8, 1);
    });
  });
});
