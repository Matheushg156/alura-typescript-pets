import { Request, Response } from "express";
import type TipoPet from "../tipos/TipoPet";

let listaDePets: TipoPet[] = [];

export default class PetController {
    criaPet(req: Request, res: Response) {
        const {
            id,
            nome,
            especie,
            adotado,
            idade
        } = <TipoPet>req.body;

        const novoPet = {
            id,
            nome,
            especie,
            adotado,
            idade
        };
        listaDePets.push(novoPet);
        return res.status(201).json(novoPet);
    }

    listaPets(req: Request, res: Response) {
        return res.status(200).json(listaDePets);
    }

    atualizaPet(req: Request, res: Response) {
        const { id } = req.params;

        const { nome, especie, adotado, idade } = <TipoPet>req.body;

        const pet = listaDePets.find((pet) => pet.id === Number(id));

        if (!pet) {
            return res.status(404).json({ mensagem: "Pet não encontrado" });
        }

        pet.nome = nome;
        pet.especie = especie;
        pet.adotado = adotado;
        pet.idade = idade;

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