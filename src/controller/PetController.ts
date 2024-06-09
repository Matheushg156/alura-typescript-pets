import { Request, Response } from "express";
import type TipoPet from "../tipos/TipoPet";
import EnumEspecie from "../enum/EnumEspecie";

let id = 0;
function geraId() {
  id = id + 1;
  return id;
}

let listaDePets: TipoPet[] = [];

export default class PetController {
    criaPet(req: Request, res: Response) {
        const {
            nome,
            especie,
            dataDeNascimento,
            adotado
        } = <TipoPet>req.body;

        if (!nome || !especie || typeof adotado !== "boolean" || !dataDeNascimento) {
            return res.status(400).json({ mensagem: "Preencha todos os campos" });
        }

        if (!Object.values(EnumEspecie).includes(especie)) {
            return res.status(400).json({ mensagem: "Especie inválida" });
        }

        const novoPet = {
            id: geraId(),
            nome,
            especie,
            adotado,
            dataDeNascimento
        };
        listaDePets.push(novoPet);
        return res.status(201).json(novoPet);
    }

    listaPets(req: Request, res: Response) {
        return res.status(200).json(listaDePets);
    }

    atualizaPet(req: Request, res: Response) {
        const { id } = req.params;

        const { nome, especie, adotado, dataDeNascimento } = <TipoPet>req.body;

        const pet = listaDePets.find((pet) => pet.id === Number(id));

        if (!pet) {
            return res.status(404).json({ mensagem: "Pet não encontrado" });
        }

        pet.nome = nome;
        pet.especie = especie;
        pet.adotado = adotado;
        pet.dataDeNascimento = dataDeNascimento;

        return res.status(200).json(pet);
    }

    deletaPet(req: Request, res: Response) {
        const { id } = req.params;

        const pet = listaDePets.find((pet) => pet.id === Number(id));

        if (!pet) {
            return res.status(404).json({ mensagem: "Pet não encontrado" });
        }

        listaDePets = listaDePets.filter((pet) => pet.id !== Number(id));

        return res.status(200).json({ mensagem: "Pet deletado com sucesso" });
    }
}