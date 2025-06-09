import { Request, Response } from "express";
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

import { IRecipeDB } from "../interfaces/interfaces";

class PremiosController {
    private recipesFilePath: string;
    private recipesData: IRecipeDB[];

    constructor() {
        this.recipesFilePath = path.join(__dirname, '../../json/jsonRecipes.json');
        this.recipesData = this.loadRecipes();
    }

    private loadRecipes(): IRecipeDB[] {
        try {
            const fileContent = fs.readFileSync(this.recipesFilePath, 'utf-8');
            return JSON.parse(fileContent) as IRecipeDB[];
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    private saveRecipes(): void {
        try {
            fs.writeFileSync(this.recipesFilePath, JSON.stringify(this.recipesData));
        } catch (error) {
            console.error(error);
        }
    }

    public getAllRecipes = async (req: Request, res: Response): Promise<void> => {
        res.status(200).json({ message: "Resultado usuarios", result: this.recipesData });
    }

    public getRecipeById = async (req: Request, res: Response): Promise<void> => {
        const idSelect = req.params.id;
        const recipe = this.recipesData.find((item) => item.id === idSelect);

        if (!recipe) {
            res.status(404).json({ message: `"404": Receita NÃO encontrada, verifique o ${idSelect}` });
        } else {
            res.status(200).json({ message: "Resultado usuarios", result: recipe });
        }
    }

    public createRecipe = async (req: Request, res: Response): Promise<void> => {
        try {
            // Desestruturação do corpo da requisição
            const { inputTitle: title, inputDescription: description, inputIngredient: ingredients, inputCooking: cooking, inputImgUrl: imgUrl, inputCategory: category } = req.body;

            // Cria um novo objeto com as mesmas chaves e valores do corpo da requisição
            const newObject: IRecipeDB = { ...req.body, id: uuidv4() };

            // Adiciona o novo objeto ao array de receitas
            this.recipesData.push(newObject);

            // Sobrescreve o arquivo com os dados atualizados
            this.saveRecipes();

            // Responde com os dados da nova receita
            res.status(201).json(newObject);
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao criar a receita.');
        }
    }

    public editRecipe = async (req: Request, res: Response): Promise<void> => {
        try {
            const idSelect = req.params.id;
            const recipeIndex = this.recipesData.findIndex((item) => item.id === idSelect);

            if (recipeIndex === -1) {
                res.status(404).json({ message: `"404": Receita NÃO encontrada, verifique o ${idSelect}` });
            } else {
                // Desestruturação do corpo da requisição
                const { inputTitle: title, inputDescription: description, inputIngredient: ingredients, inputCooking: cooking, inputImgUrl: imgUrl, inputCategory: category } = req.body;

                // Atualiza a receita existente com os novos valores
                this.recipesData[recipeIndex] = { ...this.recipesData[recipeIndex], ...req.body };

                // Sobrescreve o arquivo com os dados atualizados
                this.saveRecipes();

                // Responde com os dados da receita atualizada
                res.status(200).json({ message: "Receita atualizada com sucesso", result: this.recipesData[recipeIndex] });
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Erro ao editar a receita.');
        }
    }
}

export default PremiosController;
