import { cssObj } from '@fuel-ui/css';
import { Box, Card, Icon, List, Text } from '@fuel-ui/react';

export type PermissionCardProps = {
  headerText: string;
  allowed: string[];
  notAllowed: string[];
};
export const PermissionCard = ({
  headerText,
  allowed,
  notAllowed,
}: PermissionCardProps) => {
  return (
    <Card css={styles.connectionDetails}>
      <Card.Header css={styles.cardHeader}>
        <Text css={styles.cardHeaderText}>{headerText}</Text>
      </Card.Header>
      <Card.Body css={styles.cardBody}>
        <Box.Flex direction="column">
          <List icon={Icon.is('Check')} iconColor="accent9">
            {allowed.map((permission) => (
              <List.Item css={styles.listItemAllowed} key={permission}>
                {permission}
              </List.Item>
            ))}
          </List>
          <List icon={Icon.is('X')} iconColor="intentsError10">
            {notAllowed.map((permission) => (
              <List.Item css={styles.listItemDisallowed} key={permission}>
                {permission}
              </List.Item>
            ))}
          </List>
        </Box.Flex>
      </Card.Body>
    </Card>
  );
};

const styles = {
  connectionDetails: cssObj({
    marginTop: '$0',
  }),
  cardHeader: cssObj({
    margin: '$0',
    px: '$3',
    py: '$2',
    borderBottom: '1px solid $bodyBg',
  }),
  cardHeaderText: cssObj({
    fontSize: '$sm',
    fontWeight: '$normal',
    color: '$intentsBase12',
  }),
  listItemAllowed: cssObj({
    fontSize: '$sm',
    fontWeight: '$normal',
  }),
  listItemDisallowed: cssObj({
    fontSize: '$sm',
  }),
  cardBody: cssObj({
    px: '$3',
    py: '$2',
    margin: '$0',
  }),
};
