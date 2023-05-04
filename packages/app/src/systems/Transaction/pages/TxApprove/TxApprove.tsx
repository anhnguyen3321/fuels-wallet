import { cssObj } from '@fuel-ui/css';
import { Alert, Button, Dialog, Icon, IconButton, Text } from '@fuel-ui/react';
import { useNavigate } from 'react-router-dom';

import { useAssets } from '~/systems/Asset';
import { Pages } from '~/systems/Core';
import { coreStyles } from '~/systems/Core/styles';
import { useTransactionRequest } from '~/systems/DApp';
import { TxContent, TxHeader } from '~/systems/Transaction';

export const TxApprove = () => {
  const txRequest = useTransactionRequest();
  const navigate = useNavigate();
  const { assets } = useAssets();

  const isFailed = txRequest.status('failed');
  const isSuccess = txRequest.status('success');
  const isDone = isFailed || isSuccess;

  const goToWallet = () => {
    txRequest.handlers.closeDialog();
    navigate(Pages.index());
  };

  const senderAndReceiverAreTheSame = () => {
    if (!txRequest?.tx?.operations[0]) return false;
    const from = txRequest?.tx?.operations[0].from;
    const to = txRequest?.tx?.operations[0].to;
    return from?.address === to?.address;
  };

  return (
    <>
      <Dialog.Heading>
        {txRequest.title}
        <IconButton
          data-action="closed"
          variant="link"
          icon={<Icon icon="X" color="gray8" />}
          aria-label="Close transaction dialog"
          isDisabled={txRequest.isLoading}
          onPress={isSuccess ? goToWallet : txRequest.handlers.closeDialog}
        />
      </Dialog.Heading>
      <Dialog.Description as="div" css={styles.description}>
        {txRequest.status('waitingApproval') && (
          <Alert
            status={senderAndReceiverAreTheSame() ? 'error' : 'warning'}
            css={styles.alert}
          >
            <Alert.Title>Confirm before approve</Alert.Title>
            <Alert.Description>
              <Text fontSize="xs" css={styles.alertDescription}>
                {senderAndReceiverAreTheSame()
                  ? 'The sender and the receiver addresses are the same.'
                  : 'Carefully check if all details in your transaction are correct'}
              </Text>
            </Alert.Description>
          </Alert>
        )}
        {txRequest.isLoading ? (
          <TxContent.Loader />
        ) : (
          <TxContent.Info
            showDetails
            tx={txRequest.tx}
            txStatus={txRequest.approveStatus()}
            assets={assets}
            header={
              <>
                {isDone && (
                  <TxHeader
                    id={txRequest.tx?.id}
                    type={txRequest.tx?.type}
                    status={txRequest.tx?.status || txRequest.approveStatus()}
                    providerUrl={txRequest.providerUrl}
                  />
                )}
              </>
            }
          />
        )}
      </Dialog.Description>
      <Dialog.Footer>
        {txRequest.showActions && (
          <>
            <Button
              color="gray"
              variant="ghost"
              isDisabled={txRequest.isLoading}
              onPress={txRequest.handlers.closeDialog}
            >
              Back
            </Button>
            <Button
              color="accent"
              isLoading={txRequest.isLoading}
              onPress={txRequest.handlers.approve}
            >
              Approve
            </Button>
          </>
        )}
        {isSuccess && (
          <Button size="sm" variant="ghost" color="accent" onPress={goToWallet}>
            Back to wallet
          </Button>
        )}
        {isFailed && (
          <Button
            size="sm"
            variant="ghost"
            color="red"
            onPress={txRequest.handlers.tryAgain}
          >
            Try again
          </Button>
        )}
      </Dialog.Footer>
    </>
  );
};

const styles = {
  description: cssObj({
    ...coreStyles.scrollable('$gray3'),
    padding: '$4',
    flex: 1,
  }),
  alert: cssObj({
    '& .fuel_alert--content': {
      gap: '$1',
    },
    ' & .fuel_heading': {
      fontSize: '$sm',
    },
    marginBottom: '$3',
  }),
  alertDescription: cssObj({
    fontWeight: '$bold',
  }),
};
