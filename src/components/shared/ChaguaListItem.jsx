import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ChaguaListItemTitle from './ChaguaListItemTitle';
import ChaguaListItemTitleEdit from './ChaguaListItemTitleEdit';

const useStyles = makeStyles(theme => ({
    disabledText: {
        color: theme.palette.error.main
    },
    listItem: {
        '&:nth-child(odd)': {
            backgroundColor: '#eee'
        },
        '&:nth-child(even)': {
            backgroundColor: '#edf3d8'
        }
    }
  }));

const ChaguaListItem = ({actions, data, index}) => {
    const {onChangeTitleCallback, onDeleteCallback, onEditCallback, onToggleCallback} = actions;
    const classes = useStyles();
    const {editing, enabled, lastSelected, title} = data;

    const onDelete = () => onDeleteCallback(index);
    const onEdit = () => onEditCallback(index);
    const onChangeTitle = value => onChangeTitleCallback(index, value)
    const onToggle = () => onToggleCallback(index);

    const getSecondaryText = lastSelected => lastSelected
        ? `Last selected ${moment(lastSelected).format("MMM D 'YY")}.`
        : 'Never selected.';

    const getPrimaryText = item => editing
        ? <ChaguaListItemTitleEdit onCancel={onEdit} onSubmit={onChangeTitle} title={title} />
        : <ChaguaListItemTitle enabled={enabled} onEdit={onEdit} title={title} />

    return (
        <ListItem ContainerProps={{className: classes.listItem}} key={index}>
            <ListItemText primary={getPrimaryText(data)} secondary={getSecondaryText(lastSelected)} />
            <ListItemSecondaryAction>
                <IconButton edge='start' aria-label={enabled ? 'disable' : 'enable'} onClick={onToggle}>
                {enabled
                    ? <RemoveCircleIcon />
                    : <AddCircleIcon />
                }
                </IconButton>
                <IconButton edge='end' aria-label='delete' onClick={onDelete}>
                    <DeleteForeverIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default ChaguaListItem;
