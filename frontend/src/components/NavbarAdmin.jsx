import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Box, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

// Modification du style de la navbar avec shadow
const StyledAppBar = styled(AppBar)({
  backgroundColor: '#fff',
  boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.1), 0px 4px 5px 0px rgba(0,0,0,0.07), 0px 1px 10px 0px rgba(0,0,0,0.06)', // Ajout du shadow
  borderBottom: '1px solid #e0e0e0',
  position: 'sticky',
  top: 0,
  zIndex: 1100
});

const NavbarAdmin = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <StyledAppBar position="static">
      <Toolbar sx={{ 
        flexWrap: 'wrap', 
        padding: isMobile ? '10px' : '16px',
        minHeight: '80px' // Hauteur minimale fixe
      }}>
        {/* Logo et Titre */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          flexGrow: 1,
          minWidth: isMobile ? '100%' : 'auto',
          marginBottom: isMobile ? 1 : 0
        }}>
          <MenuOutlinedIcon 
            sx={{ 
              color: '#1a237e', 
              marginRight: 1,
              fontSize: '52px'
            }} 
          />
          <Typography 
            variant="h5" 
            sx={{ 
              color: '#1a237e',
              fontSize: '28px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            Gestion des absences
          </Typography>
        </Box>

        {/* Icônes de droite */}
        <Box sx={{ 
          display: 'flex', 
          gap: isTablet ? 1 : 2, 
          alignItems: 'center',
          width: isMobile ? '100%' : 'auto',
          justifyContent: isMobile ? 'flex-end' : 'flex-start'
        }}>
          <IconButton 
            size="large"
            sx={{ 
              '&:hover': { 
                backgroundColor: 'rgba(26, 35, 126, 0.04)' 
              } 
            }}
          >
            <NotificationsOutlinedIcon 
              sx={{ 
                color: '#1a237e',
                fontSize: '32px'
              }} 
            />
          </IconButton>
          <IconButton 
            size="large"
            sx={{ 
              '&:hover': { 
                backgroundColor: 'rgba(26, 35, 126, 0.04)' 
              } 
            }}
          >
            <PersonOutlineOutlinedIcon 
              sx={{ 
                color: '#1a237e',
                fontSize: '32px'
              }} 
            />
            <Typography 
              sx={{ 
                ml: 1, 
                color: '#1a237e',
                fontSize: '28px',
                fontWeight: 500,
                display: isTablet ? 'none' : 'block'
              }}
            >
              Admin
            </Typography>
          </IconButton>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default NavbarAdmin;
