import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Box,
  Chip,
  Tooltip,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Search as SearchIcon,
  Settings as SettingsIcon,
  AccountCircle as AccountIcon,
  Notifications as NotificationsIcon,
  Download as ExportIcon,
  Clear as ClearIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { useApp } from '../context/AppContext';

const Header = ({ onMenuToggle }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const {
    session,
    searchResults,
    toolsStatus,
    notifications,
    exportSearchHistory,
    clearSearchHistory,
  } = useApp();

  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchor, setNotificationAnchor] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationOpen = (event) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const getActiveToolsCount = () => {
    return Object.values(toolsStatus).filter(status => status === 'running').length;
  };

  const getUnreadNotifications = () => {
    return notifications.filter(n => !n.read).length;
  };

  return (
    <AppBar position="fixed" elevation={0}>
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, sm: 2, md: 3 } }}>
        {/* Left Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
          <Typography
            variant={isMobile ? 'h6' : 'h5'}
            component="div"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(135deg, #00d4ff 0%, #ff6b35 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0px 2px 4px rgba(0, 212, 255, 0.3)',
            }}
          >
            {isMobile ? 'IS' : 'InfoScape'}
          </Typography>
          
          {!isMobile && (
            <Chip
              label={`v2.0.0`}
              size="small"
              color="primary"
              variant="outlined"
            />
          )}
        </Box>

        {/* Center Section - Session Info (Hidden on mobile) */}
        {!isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {session.id && (
              <Tooltip title={`Session: ${session.id}`}>
                <Chip
                  icon={<InfoIcon />}
                  label={`${searchResults.length} searches`}
                  size="small"
                  variant="filled"
                  sx={{ 
                    backgroundColor: 'rgba(0, 212, 255, 0.2)',
                    color: theme.palette.primary.main,
                  }}
                />
              </Tooltip>
            )}
            
            {getActiveToolsCount() > 0 && (
              <Tooltip title={`${getActiveToolsCount()} tools running`}>
                <Chip
                  icon={<SearchIcon />}
                  label={`${getActiveToolsCount()} active`}
                  size="small"
                  color="warning"
                  variant="filled"
                  sx={{ 
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                      '0%': { opacity: 1 },
                      '50%': { opacity: 0.7 },
                      '100%': { opacity: 1 },
                    },
                  }}
                />
              </Tooltip>
            )}
          </Box>
        )}

        {/* Right Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
          {/* Export Button (Hidden on mobile) */}
          {!isMobile && (
            <Tooltip title="Export Search History">
              <IconButton
                color="inherit"
                onClick={exportSearchHistory}
                disabled={searchResults.length === 0}
                size={isMobile ? 'small' : 'medium'}
              >
                <ExportIcon />
              </IconButton>
            </Tooltip>
          )}

          {/* Clear History Button (Hidden on mobile) */}
          {!isMobile && (
            <Tooltip title="Clear Search History">
              <IconButton
                color="inherit"
                onClick={clearSearchHistory}
                disabled={searchResults.length === 0}
                size={isMobile ? 'small' : 'medium'}
              >
                <ClearIcon />
              </IconButton>
            </Tooltip>
          )}

          {/* Notifications */}
          <Tooltip title="Notifications">
            <IconButton
              color="inherit"
              onClick={handleNotificationOpen}
              size={isMobile ? 'small' : 'medium'}
            >
              <NotificationsIcon fontSize={isMobile ? 'small' : 'medium'} />
              {getUnreadNotifications() > 0 && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: isMobile ? 6 : 8,
                    right: isMobile ? 6 : 8,
                    width: isMobile ? 6 : 8,
                    height: isMobile ? 6 : 8,
                    backgroundColor: theme.palette.error.main,
                    borderRadius: '50%',
                  }}
                />
              )}
            </IconButton>
          </Tooltip>

          {/* Settings Menu */}
          <Tooltip title="Settings">
            <IconButton 
              color="inherit" 
              onClick={handleMenuOpen}
              size={isMobile ? 'small' : 'medium'}
            >
              <SettingsIcon fontSize={isMobile ? 'small' : 'medium'} />
            </IconButton>
          </Tooltip>

          {/* User Avatar (Hidden on very small mobile) */}
          {!isMobile && (
            <Avatar
              sx={{
                width: isTablet ? 28 : 32,
                height: isTablet ? 28 : 32,
                bgcolor: theme.palette.primary.main,
                cursor: 'pointer',
              }}
              onClick={handleMenuOpen}
            >
              <AccountIcon fontSize="small" />
            </Avatar>
          )}
        </Box>

        {/* Settings Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: isMobile ? 280 : 200,
              maxWidth: isMobile ? '90vw' : 'auto',
            },
          }}
        >
          <MenuItem 
            onClick={handleMenuClose}
            sx={{ 
              py: isMobile ? 2 : 1,
              minHeight: isMobile ? 48 : 'auto',
            }}
          >
            <SettingsIcon sx={{ mr: 1 }} />
            Preferences
          </MenuItem>
          {isMobile && (
            <>
              <MenuItem 
                onClick={() => {
                  exportSearchHistory();
                  handleMenuClose();
                }}
                sx={{ 
                  py: 2,
                  minHeight: 48,
                }}
                disabled={searchResults.length === 0}
              >
                <ExportIcon sx={{ mr: 1 }} />
                Export Data
              </MenuItem>
              <MenuItem 
                onClick={() => {
                  clearSearchHistory();
                  handleMenuClose();
                }}
                sx={{ 
                  py: 2,
                  minHeight: 48,
                }}
                disabled={searchResults.length === 0}
              >
                <ClearIcon sx={{ mr: 1 }} />
                Clear History
              </MenuItem>
            </>
          )}
          {!isMobile && (
            <>
              <MenuItem onClick={() => {
                exportSearchHistory();
                handleMenuClose();
              }}>
                <ExportIcon sx={{ mr: 1 }} />
                Export Data
              </MenuItem>
              <MenuItem onClick={() => {
                clearSearchHistory();
                handleMenuClose();
              }}>
                <ClearIcon sx={{ mr: 1 }} />
                Clear History
              </MenuItem>
            </>
          )}
        </Menu>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleNotificationClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            sx: {
              mt: 1,
              maxWidth: isMobile ? '90vw' : 400,
              minWidth: isMobile ? 280 : 320,
              maxHeight: isMobile ? '70vh' : 400,
            },
          }}
        >
          {notifications.length === 0 ? (
            <MenuItem 
              disabled
              sx={{ 
                py: isMobile ? 2 : 1,
                minHeight: isMobile ? 48 : 'auto',
              }}
            >
              <Typography variant="body2" color="text.secondary">
                No notifications
              </Typography>
            </MenuItem>
          ) : (
            notifications.slice(0, 5).map((notification) => (
              <MenuItem 
                key={notification.id} 
                onClick={handleNotificationClose}
                sx={{ 
                  py: isMobile ? 2 : 1.5,
                  minHeight: isMobile ? 56 : 'auto',
                  alignItems: 'flex-start',
                }}
              >
                <Box sx={{ width: '100%' }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontWeight: 500,
                      fontSize: isMobile ? '0.9rem' : '0.875rem',
                    }}
                  >
                    {notification.message}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{ 
                      fontSize: isMobile ? '0.75rem' : '0.7rem',
                    }}
                  >
                    {new Date(notification.timestamp).toLocaleTimeString()}
                  </Typography>
                </Box>
              </MenuItem>
            ))
          )}
          {notifications.length > 5 && (
            <MenuItem 
              onClick={handleNotificationClose}
              sx={{ 
                py: isMobile ? 1.5 : 1,
                minHeight: isMobile ? 48 : 'auto',
                justifyContent: 'center',
              }}
            >
              <Typography 
                variant="caption" 
                color="primary"
                sx={{ 
                  fontSize: isMobile ? '0.8rem' : '0.75rem',
                  fontWeight: 500,
                }}
              >
                +{notifications.length - 5} more notifications
              </Typography>
            </MenuItem>
          )}
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
