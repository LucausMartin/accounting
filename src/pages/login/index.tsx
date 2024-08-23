import { PopUp } from '@myComponents/pop-up';
import { FC } from 'react';

export const Login: FC<{ closeEvent: () => void }> = ({ closeEvent }) => {
  return (
    <div>
      <PopUp closeEvent={closeEvent}>
        <h2>Pop Up</h2>
      </PopUp>
    </div>
  );
};
