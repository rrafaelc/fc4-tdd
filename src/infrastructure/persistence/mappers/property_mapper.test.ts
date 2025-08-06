import { Property } from "../../../domain/entities/property";
import { PropertyEntity } from "../entities/property_entity";
import { PropertyMapper } from "./property_mapper";

describe("PropertyMapper", () => {
  it("deve converter PropertyEntity em Property corretamente", () => {
    const entity = new PropertyEntity();
    entity.id = "1";
    entity.name = "Apartamento";
    entity.description = "Descrição";
    entity.maxGuests = 2;
    entity.basePricePerNight = 200;

    const domain = PropertyMapper.toDomain(entity);
    expect(domain.getId()).toBe("1");
    expect(domain.getName()).toBe("Apartamento");
    expect(domain.getDescription()).toBe("Descrição");
    expect(domain.getMaxGuests()).toBe(2);
    expect(domain.getBasePricePerNight()).toBe(200);
  });

  it("deve lançar erro de validação ao faltar campos obrigatórios no PropertyEntity", () => {
    const entity = new PropertyEntity();
    entity.id = "1";
    entity.name = "Apartamento";

    expect(() => PropertyMapper.toDomain(entity)).toThrow(
      "Campo id, name, description, maxGuest e basePricePerNight são obrigatórios"
    );
  });

  it("deve converter Property para PropertyEntity corretamente", () => {
    const domain = new Property("1", "Apartamento", "Descrição", 2, 200)

    const entity = PropertyMapper.toPersistence(domain);
    expect(entity.id).toBe("1");
    expect(entity.name).toBe("Apartamento");
    expect(entity.description).toBe("Descrição");
    expect(entity.maxGuests).toBe(2);
    expect(entity.basePricePerNight).toBe(200);
  });
});
