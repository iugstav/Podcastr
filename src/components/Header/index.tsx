import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';
import React from 'react';
import styles from './styles.module.scss';

export const Header: React.FC = () => {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM',{
    locale: ptBR
  })

  return(
    <header className={styles.headerContainer}>
      <img src="/logo.svg" alt="podcastr"/>

      <p>O melhor pra você ouvir, sempre</p>
      <span>{currentDate}</span>
    </header>
  );
}
