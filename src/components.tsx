import { useEffect } from 'react';
import { XIcon } from '@phosphor-icons/react';

const Dialog = ({
  classes, styles, bottomButtonText,
  children, onDismiss
}: {
  classes?: {
    dialog?: string,
    childrenDiv?: string,
    cornerButton?: string,
    title?: string,
    bottomButton?: string
  },
  styles?: {
    dialog?: object,
    childrenDiv?: object
    cornerButton?: object,
    cornerButtonIcon?: {
      color?: string,
      size?: string | number
    },
    title?: object,
    bottomButton?: object
  },
  bottomButtonText?: string,
  children?: React.ReactNode,
  onDismiss?: () => void
}) => {
  useEffect(() => { document.body.style.overflow = 'hidden'; }, []);

  const dismiss = () => {
    onDismiss?.();
    document.body.style.overflow = 'visible';
  };

  return (
    <div
      style={ {
        alignItems: 'center',
        background: '#0000007f',
        display: 'flex',
        height: '100dvh',
        justifyContent: 'center',
        left: 0,
        position: 'absolute',
        top: scrollY,
        width: '100%',
        zIndex: 0x7fffffff
      } }
      onClick={ dismiss }
    >
      <div
        className={ classes?.dialog }
        style={ styles?.dialog }
        onClick={ e => e.stopPropagation() }
      >
        <div style={ {
          display: 'flex',
          justifyContent: 'flex-end'
        } }>
          <button
            className={ classes?.cornerButton }
            style={ styles?.cornerButton }
            type='button'
            onClick={ dismiss }
          >
            <XIcon { ...styles?.cornerButtonIcon }/>
          </button>
        </div>
        <div
          className={ classes?.childrenDiv }
          style={ styles?.childrenDiv }
        >
          { children }
        </div>
        <div style={ {
          display: 'flex',
          justifyContent: 'center'
        } }>
          <button
            className={ classes?.bottomButton }
            style={ styles?.bottomButton }
            type='button'
            onClick={ dismiss }
            autoFocus={ true }
          >
            { bottomButtonText ?? 'Aceptar' }
          </button>
        </div>
      </div>
    </div>
  );
};

const HSeparator = ({ size = 5 }) =>
  <div style={ { width: size } }/>

const VSeparator = ({ size = 5 }) =>
  <div style={ { height: size } }/>

export {
  Dialog,
  HSeparator,
  VSeparator
}
