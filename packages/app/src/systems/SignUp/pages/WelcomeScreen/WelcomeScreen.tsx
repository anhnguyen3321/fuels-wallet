import { Box, Button, FuelLogo } from '@fuel-ui/react';
import { useNavigate } from 'react-router-dom';

import { Header } from '../../components';

import { Layout, Pages } from '~/systems/Core';

export function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <Layout title="Sign Up" isPublic>
      <Box.Stack gap="$6" align="center">
        <FuelLogo
          size={120}
          css={{ mb: '$2', transform: 'translateY(10px)' }}
        />
        <Header title="Create a new Fuel Wallet" />
        <Box.Flex direction="column" gap="$2">
          <Button
            color="accent"
            onPress={() => navigate(Pages.signUpTerms({ action: 'create' }))}
          >
            Create a Wallet
          </Button>
          <Button
            color="intentsBase"
            variant="ghost"
            onPress={() => navigate(Pages.signUpTerms({ action: 'recover' }))}
          >
            I already have a wallet
          </Button>
        </Box.Flex>
      </Box.Stack>
    </Layout>
  );
}
