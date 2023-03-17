import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(@InjectModel(Pokemon.name) private readonly pokemonModel: Model<Pokemon>, 
  private readonly http: AxiosAdapter){}
  
  async excuteSeed() {
    await this.pokemonModel.deleteMany({});
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')
    const res = data.results.map<CreatePokemonDto>(({ name, url}) => {
      const segments = url.split('/');
      const no = +segments[ segments.length - 2];
     return { name, no };
    });
    await this.pokemonModel.insertMany(res);
    return 'Seed executed';
  }
}
