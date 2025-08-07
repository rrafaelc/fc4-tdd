import { Request, Response } from "express";
import { CreatePropertyDTO } from "../../application/dtos/create_property_dto";
import { PropertyService } from "../../application/services/property_service";

export class PropertyController {
  private propertyService: PropertyService;

  constructor(propertyService: PropertyService) {
    this.propertyService = propertyService;
  }

  async createProperty(req: Request, res: Response): Promise<Response> {
    try {
      const name = req.body.name;
      const description = req.body.description;
      const maxGuests = req.body.maxGuests;
      const basePricePerNight = req.body.basePricePerNight;

      if (!name.trim()) {
        throw new Error("O nome da propriedade é obrigatório.");
      }

      if (maxGuests <= 0) {
        throw new Error("A capacidade máxima deve ser maior que zero.");
      }

      if (!basePricePerNight) {
        throw new Error("O preço base por noite é obrigatório.");
      }

      const dto: CreatePropertyDTO = {
        name,
        description,
        maxGuests,
        basePricePerNight,
      };

      const property = await this.propertyService.createProperty(dto);

      return res.status(201).json({
        message: "Property created successfully",
        property: {
          id: property.getId(),
          name: property.getName(),
          description: property.getDescription(),
          maxGuests: property.getMaxGuests(),
          basePricePerNight: property.getBasePricePerNight(),
        },
      });
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: error.message || "An unexpected error occurred" });
    }
  }
}
