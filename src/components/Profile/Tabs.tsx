import React, { ReactElement } from 'react';
import { TabList, Tab, Tabs, TabPanels, TabPanel } from '@chakra-ui/react';
import BasicInfo, { IBasicInfoFormData } from './BasicInfo';
import BankInfo, { IBankInfoFormData } from './BankInfo';
import Documents, { IDocumentsFormData } from './Documents';

const ProfileTabs = ({
  onBankInfoEdit,
  onBasicInfoEdit,
  onDocumentsEdit,
  isLoading,
}: IProfileTabsProps): ReactElement => (
  <Tabs>
    <TabList>
      <Tab>General</Tab>
      <Tab>Bolsa</Tab>
      <Tab>Documentos</Tab>
    </TabList>

    <TabPanels>
      <TabPanel>
        <BasicInfo isLoading={isLoading} onSubmit={onBasicInfoEdit} />
      </TabPanel>
      <TabPanel>
        <BankInfo isLoading={isLoading} onSubmit={onBankInfoEdit} />
      </TabPanel>
      <TabPanel>
        <Documents isLoading={isLoading} onSubmit={onDocumentsEdit} />
      </TabPanel>
    </TabPanels>
  </Tabs>
);

interface IProfileTabsProps {
  isLoading: boolean;
  onBasicInfoEdit: (data: IBasicInfoFormData) => void;
  onBankInfoEdit: (data: IBankInfoFormData) => void;
  onDocumentsEdit: (data: IDocumentsFormData) => void;
}

export default ProfileTabs;
