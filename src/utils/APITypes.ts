export interface MsgRet {
    message: string;
}

export interface UserInfo
{
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    grupo: 'motorista' | 'passageiro' | '';
    _id: string;
}

export interface UserLogin
{
    user: UserInfo,
    token: string
}

export const DefaultUserInfo : UserInfo = {
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    grupo: '',
    _id: '',
}

export interface CCNumber
{
    _id: string;
    numero: string;
    validade: string;
}

export interface CarroInfo
{
    _id: string;
    numero: string;
    validade: string;
}

export interface VeiculoInfo {
    _id: string;
    tipo: 'van' | 'bus';
    modelo: string;
    placa: string;
    ano: string;
    passageiros: number;
    banheiro: boolean,
    poltrona: number,
    frente: string,
};

export interface ViagemInfo {
    _id: string;
    passageiros: number;
    de: string;
    para: string;
    data: Date;
    status: number;
    owner: string;
    createdAt: Date;
  }

  export interface MapCoord
  {
      lat: number;
      lng: number;
  }

  export interface MapRota
  {
      inicio: MapCoord;
      destino: MapCoord;
  }

  export interface LocationAddressInfo
  {
      estado?: string;
      cidade?: string;
  }

  export interface DBEstado{
    _id: string;
    nome: string;
  }

  export interface DBCidade{
    _id: string;
    nome: string;
    estado: string;
  }

  export interface EstadoCidadeList
  {
      estados: DBEstado[];
      cidades: DBCidade[];
  }