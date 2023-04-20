import type { AxiosError } from 'axios';


export const getAxiosError = (error: AxiosError) => {
  let msg: string = "Oops! Algo deu errado";
  
  if (error.response) {
    const { status } = error.response;
    switch(status)
    {
        case 400:
            msg = 'Solicitação incorreta'
            break;
        case 401:
            msg = 'Credenciais inválidas'
            break;
        case 404:
            msg = 'Oops! Não encontramos o que procura'
            break;
        case 500:
            msg = 'Oops! Algo deu errado'
            break;
    }
  } else if (error.request) {
    console.error(error.request);
  } else {
    msg = error.message;
  }

  return msg;
};
