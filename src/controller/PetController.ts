import { Request, Response } from "express";
import type TipoPet from "../tipos/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";
import PetRepository from "../repositories/PetRepository";
import { PetEntity } from "../entities/PetEntity";

let id = 0;
function geraId() {
  id = id + 1;
  return id;
}

let listaDePets: TipoPet[] = [];

export default class PetController {
    constructor(private repository: PetRepository) {}

    async criaPet(req: Request, res: Response) {
        const {
            nome,
            especie,
            dataDeNascimento,
            adotado
        } = <PetEntity>req.body;

        if (!nome || !especie || typeof adotado !== "boolean" || !dataDeNascimento) {
            return res.status(400).json({ mensagem: "Preencha todos os campos" });
        }

        if (!Object.values(EnumEspecie).includes(especie)) {
            return res.status(400).json({ mensagem: "Especie inválida" });
        }

        const novoPet: PetEntity = new PetEntity(nome, especie, dataDeNascimento, adotado);
        
        await this.repository.criaPet(novoPet);

        return res.status(201).json(novoPet);
    }

    async listaPets(_req: Request, res: Response) {
        const listaDePets = await this.repository.listaPets();
        return res.status(200).json(listaDePets);
    }

    async atualizaPet(req: Request, res: Response) {
        const { id } = req.params;
        const { success, message } = await this.repository.atualizaPet(
          Number(id),
          req.body as PetEntity
        );
      
        if (!success) {
          return res.status(404).json({ message });
        }
        return res.sendStatus(204);
      }
      
    async deletaPet(req: Request, res: Response) {
    const { id } = req.params;
    
    const { success, message } = await this.repository.deletaPet(Number(id));
    
    if (!success) {
        return res.status(404).json({ message });
    }
    return res.sendStatus(204);
    }
}