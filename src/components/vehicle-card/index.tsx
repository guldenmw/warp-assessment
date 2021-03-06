import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Button, Typography } from '@material-ui/core';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import { IVehicle } from '../../modules/interfaces';
import { StyledVehicleCard } from './styles';
import { mapDispatchToProps } from './container';


const imageBaseUrl = 'https://warpfrontendtestserver.herokuapp.com/public'

interface IComponentProps {
  vehicle: IVehicle;
}

interface IContainerProps {
  addItemToCart?: (vehicle: IVehicle) => void;
}

type IProps = IComponentProps & IContainerProps;

/**
 * Vehicle card component responsible for displaying all vehicle information
 */
const VehicleCard: FC<IProps> = (props) => {
  const { vehicle, addItemToCart } = props;

  const vehicleDescription = `${vehicle?.manufacturer}_${vehicle?.model}`;
  const imgUrl = `${imageBaseUrl}/${vehicleDescription}.jpg`;

  return (
    <StyledVehicleCard>
      <img className={'vehicle-image'} src={imgUrl} alt={vehicleDescription}/>
      <div className={'vehicle-listing-body'}>
        <article className={'description'}>
          <Typography variant={'h6'}>{vehicle?.manufacturer} {vehicle?.model} - {vehicle?.body}</Typography>
          <div className={'vehicle-summary'}>
            <Typography variant={'caption'}>
              {vehicle?.summary}
            </Typography>
          </div>
        </article>
        <section className={'add-to-cart'}>
          <div className={'vehicle-price'}>
            <span>{`R${vehicle?.price}`}</span>
          </div>
          <div className={'add-to-cart'}>
            <Button
              variant={'contained'}
              onClick={() => addItemToCart(vehicle)}
              startIcon={<AddShoppingCartIcon/>}
              color={'primary'}
              size={'small'}
            >
              Add to cart
            </Button>
          </div>
        </section>
      </div>
    </StyledVehicleCard>
  );
};

VehicleCard.defaultProps = {};

export default connect(null, mapDispatchToProps)(VehicleCard) as typeof VehicleCard;
