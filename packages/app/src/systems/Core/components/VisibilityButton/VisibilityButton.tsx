import type { IconButtonProps } from '@fuel-ui/react';
import { Icon, IconButton } from '@fuel-ui/react';

export type VisibilityButtonProps = Omit<IconButtonProps, 'icon'> & {
  visibility?: boolean;
  onChangeVisibility?: (visibility: boolean) => void;
};

export function VisibilityButton({
  visibility = true,
  onChangeVisibility,
  ...props
}: VisibilityButtonProps) {
  return (
    <IconButton
      {...props}
      onPress={() => onChangeVisibility?.(!visibility)}
      size="xs"
      variant="link"
      color="intentsBase"
      icon={
        <Icon
          {...(visibility
            ? {
                color: 'intentsBase8',
                icon: 'Eye',
              }
            : {
                color: 'accent9',
                icon: 'EyeClosed',
              })}
        />
      }
    />
  );
}
