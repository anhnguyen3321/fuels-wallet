import { cssObj } from '@fuel-ui/css';
import { Box, Button, Dialog, Text, Alert } from '@fuel-ui/react';

import { useExportVault } from '../../hooks';

import { Mnemonic } from '~/systems/Core';
import { useOverlay } from '~/systems/Overlay';
import { UnlockCard } from '~/systems/Unlock';

export function ViewRecoveryPhrase() {
  const { close } = useOverlay();
  const { handlers, error, isUnlockOpened, isLoading, words } =
    useExportVault();

  if (isUnlockOpened) {
    return (
      <UnlockCard
        onUnlock={(password) => {
          handlers.exportVault(password);
        }}
        headerText="Confirm your Password"
        onClose={() => close()}
        unlockError={error}
        isLoading={isLoading}
      />
    );
  }

  return (
    <>
      <Dialog.Heading>Recovery Phrase</Dialog.Heading>
      <Dialog.Description as="div">
        <Box.Flex gap="$4" direction="column" align="center">
          <Box css={styles.mnemonicWrapper}>
            <Mnemonic type="read" value={words} />
          </Box>
          <Alert status="warning" css={styles.alert}>
            <Alert.Description>
              <Text fontSize="xs" css={styles.alertDescription}>
                DON&APOS;T SHARE your Recovery Phrase. {'\n'}
                This phrase provides access to all your accounts. Sharing or
                losing it may result in a permanent loss of funds.
              </Text>
            </Alert.Description>
          </Alert>
        </Box.Flex>
      </Dialog.Description>
      <Dialog.Footer>
        <Button variant="ghost" onPress={() => close()}>
          Close
        </Button>
      </Dialog.Footer>
    </>
  );
}

const styles = {
  alert: cssObj({
    '& .fuel_alert--content': {
      gap: '$1',
    },
    ' & .fuel_heading': {
      fontSize: '$sm',
    },
  }),
  alertDescription: cssObj({
    fontWeight: '$bold',
  }),
  mnemonicWrapper: cssObj({
    width: '330px',
  }),
};
