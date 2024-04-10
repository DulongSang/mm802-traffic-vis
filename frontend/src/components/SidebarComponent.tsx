import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

export function SidebarComponent(props: SidebarComponentProps) {
  const { items } = props;

  return (
    <Drawer variant="permanent" PaperProps={{ sx: { width: '13%' } }}>
      <List>
        {items.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton href={item.href}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export type SidebarItem = {
  title: string,
  icon: JSX.Element,
  href: string,
};

export type SidebarComponentProps = {
  items: SidebarItem[],
};
