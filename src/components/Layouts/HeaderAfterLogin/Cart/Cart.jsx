import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import styles from "~components/Layouts/HeaderAfterLogin/Cart/Cart.module.scss"
import clsx from 'clsx';
function Cart({cart}) {
    const StyledBadge = styled(Badge)(({ theme }) => ({
      '& .MuiBadge-badge': {
        left: 0,
        top: 2,
        border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
        padding: '0 4px',
      },
    }));
    return (
    <IconButton  aria-label="cart">
      <StyledBadge  badgeContent={cart} color="secondary">
        <ShoppingCartIcon sx={{height:42,width:25}} />
      </StyledBadge>
    </IconButton>
  );
}

export default Cart;
