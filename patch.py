#!/usr/bin/env python3

import traceback
import sys
import time

import features


if __name__ == '__main__':
    with open('files/calculator_desktop.min.js', 'r') as f:
        source = f.read()

    features = [
        features.general.DisableBugsnagFeature,
        features.general.InjectGlobalsFeature,
        features.general.DefaultDarkFeature,

        features.banner.InjectBannerFeature,

        features.vectors.SupportVectorFeature,

        features.symbols.SupportInfFeature,
        features.symbols.SupportNrtFeature,
        #features.symbols.SupportDegreesFeature,
        features.symbols.SupportGreekFeature,
        #features.symbols.SupportLaTeXFeature,
    ]
    
    for feature in features:
        print(f'Adding feature {feature.__name__}...\t ', end='')
        sys.stdout.flush()

        start = time.time_ns() // 100000
        f = feature(source)

        try:
            f.patch()
            source = f.source
            print('SUCCESS\t %.2fs' % (((time.time_ns() // 100000) - start) / 10000))
        except:
            print('FAILURE\n')
            traceback.print_exc()
            print()

            if f.critical:
                print('Stopping due to broken patch in critical feature.')
                exit(1)


    with open('files/calculator_desktop_patched.min.js', 'w') as f:
        f.write(source)
