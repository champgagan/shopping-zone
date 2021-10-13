import React from 'react';
import homeimage from '../images/homepage.jpg';
import homeimage1 from '../images/homepage1.jpg';
import homeimage2 from '../images/homepage2.jpg';
import {UncontrolledCarousel} from 'reactstrap';


const items = [
    {
      src: homeimage,
      height:'200px',
      altText: 'Slide 1',      
      header: '',
      key: '1'
    },
    {
      src: homeimage1,
      altText: 'Slide 2',
      header: '',
      key: '2'
    },
    {
      src: homeimage2,
      altText: 'Slide 3',      
      header: '',
      key: '3'
    }
  ];
  export const HomePageCarousel = () => <UncontrolledCarousel items={items} />;