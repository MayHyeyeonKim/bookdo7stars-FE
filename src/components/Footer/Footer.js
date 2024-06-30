import React from 'react';
import { Box, Typography, Link } from '@mui/material';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa'; // Importing icons

const Footer = () => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Box
        sx={{
          backgroundColor: 'secondary.main',
          opacity: '70%',
          color: 'white',
          padding: '20px',
          marginTop: '20px',
          bottom: '0',
          width: '100%',
          minHeight: '300px',
          '@media (max-width:600px)': {
            padding: '10px',
            minHeight: '300px',
          },
          overflow: 'auto',
        }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'center',
          }}>
          <Box
            sx={{
              order: { xs: 1, sm: 1 },
              p: { xs: 1, sm: 2 },
              flex: 1,
            }}>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontWeight: 'bold',
                fontSize: { xs: '1rem', sm: '1.25rem' },
              }}>
              Company
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.875rem', sm: '1rem' },
              }}>
              About Us
              <br />
              Careers
              <br />
              Blog
            </Typography>
          </Box>
          <Box
            sx={{
              order: { xs: 2, sm: 2 },
              p: { xs: 1, sm: 2 },
              flex: 1,
            }}>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontWeight: 'bold',
                fontSize: { xs: '1rem', sm: '1.25rem' },
              }}>
              Contact
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.875rem', sm: '1rem' },
              }}>
              Email: bookdo7stars@book.com
              <br />
              Phone: +123 456 7890
              <br />
              <Link href="/contact" color="inherit" underline="none">
                Contact Us
              </Link>
              <Box
                sx={{
                  display: { xs: 'flex', sm: 'none' },
                  justifyContent: 'center',
                  mt: 2,
                }}>
                <Link href="https://github.com/7CodeCrew" color="inherit" underline="none" sx={{ mx: 1 }}>
                  <FaGithub size={24} />
                </Link>
                <Link href="https://twitter.com/7CodeCrew" color="inherit" underline="none" sx={{ mx: 1 }}>
                  <FaTwitter size={24} />
                </Link>
                <Link href="https://instagram.com/7CodeCrew" color="inherit" underline="none" sx={{ mx: 1 }}>
                  <FaInstagram size={24} />
                </Link>
              </Box>
            </Typography>
          </Box>
          <Box
            sx={{
              order: { xs: 3, sm: 3 },
              p: { xs: 1, sm: 2 },
              flex: 1,
              display: { xs: 'none', sm: 'block' },
            }}>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontWeight: 'bold',
                fontSize: { xs: '1rem', sm: '1.25rem' },
              }}>
              Follow Us
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontSize: { xs: '0.875rem', sm: '1rem' },
              }}>
              <Link href="https://github.com/7CodeCrew" color="inherit" underline="none">
                Github
              </Link>
              <br />
              <Link href="https://twitter.com/7CodeCrew" color="inherit" underline="none">
                Twitter
              </Link>
              <br />
              <Link href="https://instagram.com/7CodeCrew" color="inherit" underline="none">
                Instagram
              </Link>
            </Typography>
          </Box>
        </Box>
        <Box textAlign="center" mt={10}>
          <Typography variant="body2">&copy; 2024 북두칠성. All rights reserved.</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
