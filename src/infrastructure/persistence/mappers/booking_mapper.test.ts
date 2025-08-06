import { Booking } from "../../../domain/entities/booking";
import { Property } from "../../../domain/entities/property";
import { User } from "../../../domain/entities/user";
import { DateRange } from "../../../domain/value_objects/date_range";
import { BookingEntity } from "../entities/booking_entity";
import { PropertyEntity } from "../entities/property_entity";
import { UserEntity } from "../entities/user_entity";
import { BookingMapper } from "./booking_mapper";

describe("PropertyMapper", () => {
  it("deve converter BookingEntity em Booking corretamente", () => {
    const entity = new BookingEntity();
    const propertyEntity = new PropertyEntity();
    const guestEntity = new UserEntity();

    propertyEntity.id = "1";
    propertyEntity.name = "Apartamento";
    propertyEntity.description = "Descrição";
    propertyEntity.maxGuests = 2;
    propertyEntity.basePricePerNight = 200;

    guestEntity.id = "1";
    guestEntity.name = "João";

    entity.id = "1";
    entity.property = propertyEntity;
    entity.guest = guestEntity;
    entity.startDate = new Date("2025-08-01");
    entity.endDate = new Date("2025-08-06");
    entity.guestCount = 2;
    entity.totalPrice = 200;
    entity.status = "CONFIRMED";

    const domain = BookingMapper.toDomain(entity);
    expect(domain.getId()).toBe("1");
    expect(domain.getProperty().getId()).toBe("1");
    expect(domain.getProperty().getName()).toBe("Apartamento");
    expect(domain.getProperty().getDescription()).toBe("Descrição");
    expect(domain.getProperty().getMaxGuests()).toBe(2);
    expect(domain.getProperty().getBasePricePerNight()).toBe(200);
    expect(domain.getGuest().getId()).toBe("1");
    expect(domain.getGuest().getName()).toBe("João");
    expect(domain.getDateRange().getStartDate()).toEqual(
      new Date("2025-08-01")
    );
    expect(domain.getDateRange().getEndDate()).toEqual(new Date("2025-08-06"));
    expect(domain.getGuestCount()).toBe(2);
    expect(domain.getTotalPrice()).toBe(200);
    expect(domain.getStatus()).toBe("CONFIRMED");
  });

  it("deve lançar erro de validação ao faltar campos obrigatórios no BookingEntity", () => {
    const entity = new BookingEntity();
    const propertyEntity = new PropertyEntity();
    const guestEntity = new UserEntity();

    propertyEntity.id = "1";
    propertyEntity.name = "Apartamento";
    propertyEntity.description = "Descrição";
    propertyEntity.maxGuests = 2;
    propertyEntity.basePricePerNight = 200;

    guestEntity.id = "1";
    guestEntity.name = "João";

    entity.id = "1";
    entity.property = propertyEntity;
    entity.guest = guestEntity;

    expect(() => BookingMapper.toDomain(entity)).toThrow(
      "Campo id, property, guest, startDate, endDate, guestCount, totalPrice e status são obrigatórios"
    );
  });

  it("deve converter Booking para BookingEntity corretamente", () => {
    const propertyDomain = new Property(
      "1",
      "Apartamento",
      "Descrição",
      2,
      200
    );
    const guestDomain = new User("1", "João");
    const startDate = new Date("2025-08-01");
    const endDate = new Date("2025-08-06");
    const dateRangeDomain = new DateRange(startDate, endDate);

    const domain = new Booking("1", propertyDomain, guestDomain, dateRangeDomain, 2);

    const entity = BookingMapper.toPersistence(domain);
    expect(entity.id).toBe("1");
    expect(entity.property.id).toBe("1");
    expect(entity.property.name).toBe("Apartamento");
    expect(entity.property.description).toBe("Descrição");
    expect(entity.property.maxGuests).toBe(2);
    expect(entity.property.basePricePerNight).toBe(200);
    expect(entity.guest.id).toBe("1");
    expect(entity.guest.name).toBe("João");
    expect(entity.startDate).toEqual(startDate);
    expect(entity.endDate).toEqual(endDate);
    expect(entity.guestCount).toBe(2);

    const dias = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    expect(entity.totalPrice).toBe(200 * dias);
    
    expect(entity.status).toBe("CONFIRMED");
  });
});
