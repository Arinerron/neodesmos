#!/usr/bin/env python3

import traceback
import sys

import features

if __name__ == '__main__':
    with open('calculator_desktop.min.js', 'r') as f:
        source = f.read()

    features = [
        features.general.DisableBugsnagFeature,
        features.general.InjectGlobalsFeature,
        features.general.DefaultDarkFeature,

        features.banner.InjectBannerFeature,

        features.vectors.VectorNotationFeature,

        features.symbols.SupportInfFeature,
        features.symbols.SupportNrtFeature,
        #features.symbols.SupportDegreesFeature,
        features.symbols.SupportGreekFeature
    ]
    
    for feature in features:
        print(f'Adding feature {feature.__name__}...\t', end='')
        sys.stdout.flush()
        f = feature(source)

        try:
            f.patch()
            source = f.source
            print('SUCCESS')
        except:
            print('FAILURE\n')
            traceback.print_exc()
            print()

            if f.critical:
                print('Stopping due to broken patch in critical feature.')
                exit(1)


    with open('calculator_desktop_patched.min.js', 'w') as f:
        f.write(source)
