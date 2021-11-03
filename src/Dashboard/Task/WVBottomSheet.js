import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import 'react-circular-progressbar/dist/styles.css';
import './WVBottomSheet.scss';

const WVBottomSheet = ({
  dataAidSuffix,
  isOpen,
  onClose, // Callback for when bottomsheet is being closed
  buttonLayout, // Sets button layout - stacked/stackedOR/horizontal [default=horizontal]
  button1Props, // Props for button 1 (type, title, onClick, classes)
  button2Props = {},// Props for button 2 (type, title, onClick, classes)
  title, // Title for bottomsheet
  subtitle, // Subtitle for bottomsheet (shows below title)
  children, // Allows for addition of any kind of content within the BottomSheet DialogContent box
  image, // Image to show on top right corner (Use require('path'))
  classes,
  ...props // Any other props to be sent to Dialog
}) => {
  return (
    <Dialog
      data-aid={`wv-bottomsheet-${dataAidSuffix}`}
      id="wv-bottomsheet"
      open={isOpen}
      onClose={onClose}
      className={`wv-bottomsheet ${classes.container}`}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      {...props}
    >
      <DialogContent>
        <div
          className={`wv-bottomsheet-content ${classes.content}`}
          data-aid={`wv-bottomsheet-content-${dataAidSuffix}`}
        >
          <div className="wv-bc-left">
            {title &&
              <div className={`wv-bcl-title ${classes.title}`} data-aid={`wv-bcl-title-${dataAidSuffix}`}>
                {title}
              </div>
            }
            {subtitle &&
              <Subtitle className={classes.subtitle} dataAidSuffix={dataAidSuffix}>
                {subtitle}
              </Subtitle>
            }
          </div>
          {image &&
            <div className="wv-bc-right">
              <img
                className={`wv-bcr-image ${classes.image}`}
                alt=""
                src={image}
              />
            </div>
          }
        </div>
        {children &&
          <div className="wv-bottomsheet-child-content">
            {children}
          </div>
        }
      </DialogContent>
      <DialogActions>



      </DialogActions>
    </Dialog>
  );
};

const Subtitle = ({ children, className, dataAidSuffix }) => {
  return (
    <div className={`wv-bcl-subtitle ${className}`} data-aid={`wv-bcl-subtitle-${dataAidSuffix}`}>
      {children}
    </div>
  );
}

WVBottomSheet.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  buttonLayout: PropTypes.oneOf(['stacked', 'stackedOR', 'horizontal']),
  title: PropTypes.node,
  subtitle: PropTypes.node,
  children: PropTypes.node
};

WVBottomSheet.defaultProps = {
  onClose: () => {},
  buttonLayout: 'horizontal',
  button1Props: {
    type: 'primary',
  },
  classes: {},
};

WVBottomSheet.Subtitle = Subtitle;

export default WVBottomSheet;


