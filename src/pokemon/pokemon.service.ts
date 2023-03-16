import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(@InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>){}
  async create(createPokemonDto: CreatePokemonDto) {
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExeptions(error);
    }
  }

  async findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    let pokemon: Pokemon;
    if( !isNaN(+term)){
      pokemon = await this.pokemonModel.findOne({ no: term });
    }
    if (!pokemon && isValidObjectId(term)){
      pokemon = await this.pokemonModel.findById(term);
    }
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term})
    }
    if (!pokemon) throw new NotFoundException(`Pokemon with id, name or no "${term}" not found`);
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);
    try {
      await pokemon.updateOne(updatePokemonDto, {new: true});
      return {...pokemon.toJSON(), ...updatePokemonDto}; 
    } catch (error) {
      this.handleExeptions(error);
    }
  }

  async remove(id: string) {
    const { deletedCount } = await this.pokemonModel.deleteOne({_id: id});
    if (deletedCount === 0) throw new BadRequestException(`Pokemon with id "${id}" not found`);
    return;
  }

  private handleExeptions(error: any) {
    if ( error.code === 11000) {
      throw new BadRequestException(`Pokemon exist in db ${JSON.stringify(error.keyValue)}`);
      
    }
    console.log(error);
    throw new Error("Error exeption server");
  }
}
