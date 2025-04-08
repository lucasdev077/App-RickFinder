import React from 'react';
import './Card.css'; 

// Componente funcional que recebe props com dados do personagem
function Card({ image, name, species, status, location }) {
  return (
    // Container principal do card com classe "card"
    <div className="card">
      
      {/* Imagem do personagem, com alt para acessibilidade */}
      <img src={image} alt={name} className="card-image" />

      {/* Conteúdo do card, onde aparecem os textos */}
      <div className="card-content">
        {/* Nome do personagem como título */}
        <h2 className="card-name">{name}</h2>

        {/* Outras informações exibidas com <p> e destaque usando <strong> */}
        {/* aqui vai aparecer as informações dos personagens dentro do EP e também com o status deles dentro da série*/}
        <p><strong>Espécie:</strong> {species}</p>
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Localização:</strong> {location}</p>
      </div>
    </div>
  );
}

// Exporta o componente para poder ser usado em outros arquivos (como App.js)
export default Card;
