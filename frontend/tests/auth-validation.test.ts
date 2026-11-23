import { describe, it, expect } from "vitest";
import {
  validateEmail,
  validateUsername,
  validatePassword,
  validateRegistration,
} from "@/features/auth/registration-validation";

describe("Frontend Auth Validation (registration-validation)", () => {
  describe("validateEmail", () => {
    it("1. zavrne prazen e-poštni naslov", () => {
      expect(validateEmail("")).toBe("Vnesi veljaven e-poštni naslov.");
      expect(validateEmail("   ")).toBe("Vnesi veljaven e-poštni naslov.");
    });

    it("2. zavrne neveljaven e-poštni naslov brez domene ali @", () => {
      expect(validateEmail("neveljaven")).toBe("Vnesi veljaven e-poštni naslov.");
      expect(validateEmail("user@")).toBe("Vnesi veljaven e-poštni naslov.");
      expect(validateEmail("user@domain")).toBe("Vnesi veljaven e-poštni naslov.");
    });

    it("3. zavrne predolg e-poštni naslov (> 254 znakov)", () => {
      const longEmail = `${"a".repeat(250)}@example.com`;
      expect(validateEmail(longEmail)).toBe("Vnesi veljaven e-poštni naslov.");
    });

    it("4. sprejme veljaven e-poštni naslov", () => {
      expect(validateEmail("uporabnik@test.si")).toBeUndefined();
      expect(validateEmail("janez.novak@student.um.si")).toBeUndefined();
    });
  });

  describe("validateUsername", () => {
    it("5. zavrne uporabniško ime krajše od 3 znakov", () => {
      expect(validateUsername("ab")).toBe("Uporabniško ime naj vsebuje 3–30 črk, številk ali podčrtajev.");
    });

    it("6. zavrne uporabniško ime daljše od 30 znakov", () => {
      expect(validateUsername("a".repeat(31))).toBe("Uporabniško ime naj vsebuje 3–30 črk, številk ali podčrtajev.");
    });

    it("7. zavrne uporabniško ime z nedovoljenimi znaki ali presledki", () => {
      expect(validateUsername("user name")).toBe("Uporabniško ime naj vsebuje 3–30 črk, številk ali podčrtajev.");
      expect(validateUsername("user!name")).toBe("Uporabniško ime naj vsebuje 3–30 črk, številk ali podčrtajev.");
    });

    it("8. sprejme veljavno uporabniško ime z alfanumeričnimi znaki in podčrtaji", () => {
      expect(validateUsername("uporabnik_123")).toBeUndefined();
      expect(validateUsername("GritLeader")).toBeUndefined();
    });
  });

  describe("validatePassword", () => {
    it("9. zavrne geslo krajše od 8 znakov", () => {
      expect(validatePassword("Geslo1!")).toBe("Geslo mora biti dolgo od 8 do 20 znakov.");
    });

    it("10. zavrne geslo daljše od 20 znakov", () => {
      expect(validatePassword("Geslo1!DolgoPrevecPrevec")).toBe("Geslo mora biti dolgo od 8 do 20 znakov.");
    });

    it("11. zavrne geslo brez velike črke", () => {
      expect(validatePassword("geslo1234!")).toBe("Geslo mora vsebovati vsaj eno veliko črko.");
    });

    it("12. zavrne geslo brez male črke", () => {
      expect(validatePassword("GESLO1234!")).toBe("Geslo mora vsebovati vsaj eno malo črko.");
    });

    it("13. zavrne geslo brez številke", () => {
      expect(validatePassword("GesloBrezSt!#")).toBe("Geslo mora vsebovati vsaj eno številko.");
    });

    it("14. zavrne geslo brez posebnega znaka", () => {
      expect(validatePassword("Geslo123456")).toBe("Geslo mora vsebovati vsaj en posebni znak s seznama v pravilih.");
    });

    it("15. sprejme veljavno in varno geslo z vsemi zahtevanimi znaki", () => {
      expect(validatePassword("Geslo1234!")).toBeUndefined();
      expect(validatePassword("Varno#Geslo99")).toBeUndefined();
    });
  });

  describe("validateRegistration", () => {
    it("16. vrne napake za vsa neveljavna polja", () => {
      const result = validateRegistration({
        email: "napaka",
        username: "x",
        password: "123",
      });
      expect(result.fieldErrors.email).toBeDefined();
      expect(result.fieldErrors.username).toBeDefined();
      expect(result.fieldErrors.password).toBeDefined();
    });

    it("17. očisti presledke in pretvori email v male črke ob veljavni registraciji", () => {
      const result = validateRegistration({
        email: "   User.Test@Example.COM   ",
        username: "   valid_user   ",
        password: "VarnoGeslo1!",
      });
      expect(result.fieldErrors).toEqual({});
      expect(result.values.email).toBe("user.test@example.com");
      expect(result.values.username).toBe("valid_user");
    });
  });
});
