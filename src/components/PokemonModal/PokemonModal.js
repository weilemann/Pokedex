import React, { useState } from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import { useEffect } from 'react';
import axios from 'axios';

import getPokemonImageUrl from '../../services/api';

const PokemonModal = ({ show, handleClose, pokemon }) => {
  const [pokemonData, setPokemonData] = useState({
    types: [],
    id: 0,
    weight: 0,
    height: 0,
  });
  const capitalizedName =
    pokemon?.name.charAt(0).toUpperCase() + pokemon?.name.slice(1);
  const capitalizedType = pokemonData.types.map(
    (type) => type[0].toUpperCase() + type.slice(1)
  );

  useEffect(() => {
    const getPokemonData = async () => {
      if (pokemon != null) {
        await axios.get(pokemon.url).then((response) => {
          setPokemonData({
            types: response.data.types.map((typeInfo) => typeInfo.type.name),
            id: response.data.id,
            weight: response.data.weight,
            height: response.data.height,
          });
        });
      }
    };

    getPokemonData();
  }, [pokemon]);

  return (
    <Modal
      show={show}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      onHide={handleClose}
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          <h1>{capitalizedName}</h1>
        </Modal.Title>
      </Modal.Header>
      <Container>
        <Row style={{ height: '600px' }}>
          <Col xs={12} md={6} style={{ backgroundColor: 'lightgreen' }}>
            <h1>Aqui era pra ter uma imagem</h1>
          </Col>
          <Col xs={6} md={6} style={{ backgroundColor: 'lightblue' }}>
            <Row></Row>
          </Col>
        </Row>
      </Container>
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PokemonModal;
