import React from 'react';
import styled from 'styled-components';

import { ProductsContext } from './ProductsContext';
import SmallItem from './SmallItem';
import Typehead from './Typehead';

const Searched = () => {
  const [items, setItems] = React.useState(null);
  const [status, setStatus] = React.useState('loading');

  React.useEffect(() => {
    fetch('/api/someproducts')
      .then((res) => res.json())
      .then((json) => {
        setItems(json.data);
        setStatus('idle');
      });
  }, []);
  // if (status === 'idle') {
  //   console.log(items, 'items');
  // }

  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  return (
    <Wrapper>
      <Typehead suggestions={items} />
      <nav>NAVIGATION BAR</nav> {/*To replace with Nav component later*/}
      <MainContainer>
        <div className="___filterExample">FILTER BOX</div>{' '}
        {/*To replace with filter component later*/}
        <ItemsContainer>
          {items.map((item) => {
            // return <Item>{item.name}</Item>;
            return <SmallItem item={item} />;
          })}
        </ItemsContainer>
        {/* <div className="___cart">CART BOX</div>{' '}
        To replace with Cart component later */}
      </MainContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;

  nav {
    border: 2px black solid;
    height: 5%;
  }
`;
const MainContainer = styled.div`
  border: solid blue 2px;
  margin-top: 20px;
  height: 90%;
  display: flex;

  .___filterExample {
    border: solid red 2px;
    margin: 0 15px;
    /* flex-grow: 0.6; */
    flex-basis: 15%;
  }
  /* .___cart {
    border: solid red 2px;
    margin: 0 15px;
    flex-basis: 15%;
  } */
`;
const ItemsContainer = styled.div`
  border: solid green 2px;
  display: flex;
  flex-wrap: wrap;
  /* flex-grow: 4; */
  flex-basis: 80%;
`;
const Item = styled.div`
  border: solid 2px gray;
  width: 250px;
  height: 420px;
  margin: 30px;
`;
export default Searched;