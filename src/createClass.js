import { Map } from 'immutable';

export default function createClass(spec={}) {
    const {
        displayName = '',
        getDescription,
        getDefaultFixtures
    } = spec;

    class Action {
        // Static and on the instance, because that's just easier
        static displayName = displayName;
        displayName = displayName;

        constructor(fixtures = Map()) {
            this.fixtures = this.getDefaultFixtures().merge(fixtures);
        }

        // The description is used when describing what will be run, and other
        // logging tasks.
        getDescription() {
            return (
                typeof getDescription === 'function'
                    ? getDescription.call(this)
                    : this.displayName
            );
        }

        // Default fixtures, merged with those passed into the Action's
        // constructor, are used to differentiate identify the Action.
        getDefaultFixtures() {
            return (
                typeof getDefaultFixtures === 'function'
                    ? Map(getDefaultFixtures.call(this))
                    : Map()
            );
        }
    }

    return Action;
}
