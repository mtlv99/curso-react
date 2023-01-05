
import { useCounter, useFetch } from '../hooks';
import { LoadingQuote } from '../03-examples';
import { QuoteModified } from './QuoteModified';

// Copia de 03-examples/MultipleCustomHooks con algunas modificaciones.
export const Layout = () => {
  const {
    counter,
    increment,
  } = useCounter(1);


  // 'https://www.breakingbadapi.com/api/quotes/1' (el API original) no estaba funcionando al momento de escribir este Hook.
  const { data, isLoading, error } = useFetch(`https://api.breakingbadquotes.xyz/v1/quotes/${counter}`);

  // Se puede destructurar de un boolean en 'false' sin que haya un error (seeh, cosas extrañas de JS).
  // Por lo que si la condición falla, no se caerá el app. Cuando el boolean está en falso, los resultados
  // de la destructuración (author y quote) tendrán valores 'undefined'.
  const { author, quote } = !!data && data[0];

  const onNextQuote = () => {
    increment();
  };

  return (
    <>


      <h1>Breaking Bad Quotes</h1>
      <hr />
      {/*
        Se pueden usar condicionales así, siempre y cuando el JSX NO sea muy GRANDE.
        No es que no funcionará si son grandes, solo que deja el codigo muy ilegible.
        Cualquier otro dev se lo va a agradecer. <3
        (más adelante en el curso se sacó el JSX existente a componentes por separado, que es el resultado
        que se ve ahorita)
      */}
      {isLoading ? (<LoadingQuote />) : (<QuoteModified author={author} quote={quote} />)}

      <button className="btn btn-primary" type="button" onClick={onNextQuote} disabled={isLoading}>Next Quote</button>

    </>
  );
};
