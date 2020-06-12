import React, { useEffect, useState } from 'react';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import { HorizontalBar } from 'react-chartjs-2';

import './style.css';

const PokemonModal = ({ show, handleClose, pokemon }) => {
  const [selectedPokemon, setSelectedPokemon] = useState({
    name: '',
    types: ['none', 'none'],
    id: 0,
    weight: 0,
    height: 0,
    imageUrl: '',
    spriteImageUrl: '',
    shinySpriteImageUrl: '',
    abilities: ['none', 'none'],
  });

  const [barChart, setBarChart] = useState({
    labels: [
      'HP',
      'Attack',
      'Defense',
      'Special Attack',
      'Special Defense',
      'Speed',
    ],
    datasets: [
      {
        label: '',
        backgroundColor: [
          '#6eff636e',
          '#ff63636e',
          '#ffac636e',
          '#6366ff6e',
          '#fffa636e',
          '#f563ff6e',
        ],
        borderColor: [
          '#6eff63',
          '#ff6363',
          '#ffac63',
          '#6366ff',
          '#fffa63',
          '#f563ff',
        ],
        borderWidth: 1,
        hoverBackgroundColor: [
          '#6eff63',
          '#ff6363',
          '#ffac63',
          '#6366ff',
          '#fffa63',
          '#f563ff',
        ],
        data: [0, 0, 0, 0, 0, 0],
      },
    ],
  });
  const { datasets } = barChart;

  useEffect(() => {
    if (pokemon.name !== undefined) {
      setSelectedPokemon(pokemon);
      setBarChart({
        ...barChart,
        datasets: [{ ...datasets[0], data: pokemon.baseStats }],
      });
    }
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
          <h1>{selectedPokemon?.name}</h1>
        </Modal.Title>
      </Modal.Header>
      <Container>
        <Row>
          <Col xs={4} md={4}>
            <Col>
              <div className='modal-type-container'>
                <span className={`type ${selectedPokemon.types[0]} left`}>
                  {selectedPokemon.types[0]}
                </span>
                <span className={`type ${selectedPokemon.types[1]} left`}>
                  {selectedPokemon.types[1]}
                </span>
              </div>
              <div className='modal-img-container'>
                <label>
                  <strong>Default Sprite</strong>
                </label>
                <img
                  src={selectedPokemon.spriteImageUrl}
                  alt={selectedPokemon.name}
                />
              </div>
            </Col>
            <Col>
              <div className='modal-img-container'>
                <label>
                  <strong>Shiny Sprite</strong>
                </label>
                <img
                  src={selectedPokemon.shinySpriteImageUrl}
                  alt={selectedPokemon.name}
                />
              </div>
            </Col>
          </Col>
          <Col xs={8} md={8}>
            <div className='modal-text-container'>
              <p>
                <strong>Weight: </strong>
                {selectedPokemon.weight} kg
              </p>
              <p>
                <strong>Height: </strong>
                {selectedPokemon.height} m
              </p>
              <p>
                <strong>Abilities: </strong>
                {selectedPokemon.abilities.join(' / ')}
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={12}>
            <HorizontalBar
              height={100}
              data={barChart}
              options={{
                legend: {
                  display: false,
                },
                scales: {
                  xAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },
              }}
            />
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
