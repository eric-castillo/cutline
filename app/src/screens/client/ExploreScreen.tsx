import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {AppText} from '../../components/AppText';
import {LangToggle} from '../../components/LangToggle';
import {PoleStripe} from '../../components/PoleStripe';
import {ServiceRow} from '../../components/ServiceRow';
import type {Language} from '../../i18n';
import {formatMoney} from '../../lib/format';
import {colors, layout, space} from '../../theme';
import {SAMPLE_SERVICES} from './exploreSample';

export function ExploreScreen() {
  const {t, i18n} = useTranslation();
  const insets = useSafeAreaInsets();
  const language = i18n.language as Language;

  return (
    <View style={styles.screen}>
      <PoleStripe />
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {paddingTop: insets.top + space[4]},
        ]}
      >
        <View style={styles.header}>
          <AppText
            variant="display"
            accessibilityRole="header"
            style={styles.title}
          >
            {t('explore.title')}
          </AppText>
          <LangToggle />
        </View>
        {SAMPLE_SERVICES.map(service => (
          <ServiceRow
            key={service.id}
            name={service.name[language] ?? service.name.en}
            price={formatMoney(service.priceCents, language)}
            duration={t('explore.duration', {
              minutes: service.durationMinutes,
            })}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {flex: 1, backgroundColor: colors.paper},
  content: {
    width: '100%',
    maxWidth: layout.clientMaxWidth,
    alignSelf: 'center',
    paddingHorizontal: layout.gutter,
    paddingBottom: space[6],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: space[3],
    marginBottom: space[4],
  },
  title: {flex: 1},
});
