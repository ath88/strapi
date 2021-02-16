import React, { useMemo } from 'react';
import { BackHeader, BaselineAlignment, auth, Select, Option } from 'strapi-helper-plugin';
import { useHistory } from 'react-router-dom';
import { get } from 'lodash';
import { Padded, Flex } from '@buffetjs/core';
import { useIntl } from 'react-intl';
import ContainerFluid from '../../components/ContainerFluid';
import FormBloc from '../../components/FormBloc';
import SizedInput from '../../components/SizedInput';
import { Header } from '../../components/Settings';
import { useSettingsForm } from '../../hooks';
import { form, schema } from './utils';
import Bloc from '../../components/Bloc';
import useLanguages from '../LanguageProvider/hooks/useLanguages';
import { languages, languageNativeNames } from '../../i18n';
import { Title, ProfilePageLabel, Spacer } from './components';
import IntlInput from '../../components/IntlInput';

const ProfilePage = () => {
  const { goBack } = useHistory();
  const { currentLanguage, selectLanguage } = useLanguages();
  const { formatMessage } = useIntl();

  const onSubmitSuccessCb = data => auth.setUserInfo(data);

  const [
    { formErrors, initialData, isLoading, modifiedData, showHeaderLoader, showHeaderButtonLoader },
    // eslint-disable-next-line no-unused-vars
    _,
    { handleCancel, handleChange, handleSubmit },
  ] = useSettingsForm('/admin/users/me', schema, onSubmitSuccessCb, [
    'email',
    'firstname',
    'lastname',
    'username',
  ]);

  const headerLabel = useMemo(() => {
    const userInfos = auth.getUserInfo();

    if (modifiedData) {
      return modifiedData.username || `${modifiedData.firstname} ${modifiedData.lastname}`;
    }

    return userInfos.username || `${userInfos.firstname} ${userInfos.lastname}`;
  }, [modifiedData]);

  return (
    <>
      <BackHeader onClick={goBack} />
      <form onSubmit={handleSubmit}>
        <ContainerFluid padding="18px 30px 18px 30px">
          <Header
            isLoading={showHeaderLoader}
            initialData={initialData}
            label={headerLabel}
            modifiedData={modifiedData}
            onCancel={handleCancel}
            showHeaderButtonLoader={showHeaderButtonLoader}
          />
          <BaselineAlignment top size="3px" />

          <FormBloc isLoading={isLoading}>
            {Object.keys(form).map(key => {
              return (
                <SizedInput
                  {...form[key]}
                  key={key}
                  error={formErrors[key]}
                  name={key}
                  onChange={handleChange}
                  value={get(modifiedData, key, '')}
                />
              );
            })}
          </FormBloc>
        </ContainerFluid>

        <ContainerFluid padding="18px 30px 18px 30px">
          <Bloc>
            <Padded top left right size="md">
              <Padded top bottom size="sm">
                <Padded top bottom size="sm">
                  <Title>
                    {formatMessage({ id: 'Settings.profile.form.section.password.title' })}
                  </Title>
                </Padded>
              </Padded>

              <Flex>
                <div style={{ flex: 1 }}>
                  <IntlInput
                    label="Auth.form.password.label"
                    type="password"
                    autoComplete="new-password"
                    validations={{}}
                    error={formErrors.password}
                    name="password"
                    onChange={handleChange}
                    value={get(modifiedData, 'password', '')}
                  />
                </div>

                <Spacer />

                <div style={{ flex: 1 }}>
                  <IntlInput
                    label="Auth.form.confirmPassword.label"
                    type="password"
                    validations={{}}
                    error={formErrors.confirmPassword}
                    name="confirmPassword"
                    onChange={handleChange}
                    value={get(modifiedData, 'confirmPassword', '')}
                  />
                </div>
              </Flex>
            </Padded>
          </Bloc>
        </ContainerFluid>

        <ContainerFluid padding="18px 30px 18px 30px">
          <Bloc>
            <Padded top left right bottom size="md">
              <Padded top bottom size="sm">
                <Padded top bottom size="sm">
                  <Title>
                    {formatMessage({ id: 'Settings.profile.form.section.experience.title' })}
                  </Title>
                </Padded>
              </Padded>

              <ProfilePageLabel htmlFor="">Interface language</ProfilePageLabel>

              <div style={{ width: 'calc(50% - 3rem)' }}>
                <Select
                  aria-labelledby="interface-language"
                  selectedValue={currentLanguage}
                  onChange={selectLanguage}
                >
                  {languages.map(language => {
                    const langName = languageNativeNames[language];

                    return (
                      <Option value={language} key={language}>
                        {langName}
                      </Option>
                    );
                  })}
                </Select>
              </div>
            </Padded>
          </Bloc>
        </ContainerFluid>
      </form>
    </>
  );
};

export default ProfilePage;
