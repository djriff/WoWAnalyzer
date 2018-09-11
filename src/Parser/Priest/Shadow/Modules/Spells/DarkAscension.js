import React from 'react';

import Analyzer from 'Parser/Core/Analyzer';
import Enemies from 'Parser/Core/Modules/Enemies';

import SPELLS from 'common/SPELLS';
import SpellLink from 'common/SpellLink';
import SpellIcon from 'common/SpellIcon';
import { formatPercentage } from 'common/format';
import SmallStatisticBox, { STATISTIC_ORDER } from 'Interface/Others/SmallStatisticBox';
import Voidform from '../Spells/Voidform';

class DarkAscension extends Analyzer {
  static dependencies = {
    voidform: Voidform,
  };

  _previousVoidformCast = Voidform.pre;
  _currentVoidformStack = null;
  _inVoidform = Voidform.inVoidform();

  _voidforms = Voidform.voidforms();

  constructor(...args) {
    super(...args);
    this.active = this.selectedCombatant.hasTalent(SPELLS.MINDBENDER_TALENT_SHADOW.id);
  }

  get uptime() {
    return this.enemies.getBuffUptime(SPELLS.VAMPIRIC_TOUCH.id) / this.owner.fightDuration;
  }

  get suggestionStackThresholds() {
    return darkascension => ({
      actual: darkascension.voidformStacks,
      isLessThan: {
        minor: 18,
        average: 17,
        major: 2,
      },
      style: 'number',
    });
  }
}


export default DarkAscension;
