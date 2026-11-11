import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {LANGUAGES, Language, setLanguage} from '../i18n';
import {border, colors, radius, size} from '../theme';
import {AppText} from './AppText';

/** Segmented EN | ES switch; the change applies immediately. */
export function LangToggle() {
  const {t, i18n} = useTranslation();
  const current = i18n.language as Language;

  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={t('lang.label')}
      style={styles.group}
    >
      {LANGUAGES.map(language => {
        const selected = language === current;
        return (
          <Pressable
            key={language}
            accessibilityRole="radio"
            accessibilityLabel={t(`lang.${language}`)}
            aria-checked={selected}
            onPress={() => setLanguage(language)}
            style={[styles.segment, selected ? styles.selected : undefined]}
          >
            <AppText variant="tab" color={selected ? colors.paper : colors.ink}>
              {language.toUpperCase()}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    borderWidth: border.thick,
    borderColor: colors.ink,
    borderRadius: radius.sm,
    overflow: 'hidden',
  },
  selected: {backgroundColor: colors.ink},
  segment: {
    minWidth: size.touch,
    minHeight: size.touch - border.thick * 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
