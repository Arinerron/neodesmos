#!/usr/bin/env python3

from . import *

FROM_BANNER = r'''
'\n    <svg version="1.1" class="dcg-desmos-svg-logo" id="svg-desmos" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n   viewBox="0 0 48 9.876" style="enable-background:new 0 0 48 9.876;" xml:space="preserve">\n    <g>\n      <g>\n        <g id="desmos_1_">\n          <g>\n            <path d="M40.314,3.366c-0.73-0.752-1.634-1.136-2.681-1.136c-1.051,0-1.956,0.384-2.688,1.136c-0.731,0.754-1.1,1.674-1.1,2.736\n              c0,1.041,0.368,1.948,1.092,2.7c0.728,0.745,1.637,1.127,2.701,1.127s1.969-0.382,2.691-1.127\n              c0.722-0.755,1.09-1.663,1.09-2.713C41.418,5.034,41.048,4.121,40.314,3.366z M37.633,3.553c0.662,0,1.223,0.251,1.71,0.757\n              c0.487,0.513,0.723,1.105,0.723,1.801c0,0.709-0.234,1.292-0.713,1.787c-0.475,0.494-1.043,0.734-1.736,0.734\n              c-0.689,0-1.251-0.238-1.713-0.724c-0.47-0.493-0.699-1.076-0.699-1.781c0-0.709,0.238-1.304,0.724-1.817\n              C36.409,3.8,36.968,3.553,37.633,3.553z"/>\n          </g>\n          <g>\n            <path d="M6.841,0c-0.325,0-0.604,0.243-0.65,0.565L6.188,3.16C5.616,2.655,4.952,2.358,4.205,2.276h-0.02\n              C4.137,2.269,4.087,2.269,4.041,2.263c-0.05-0.006-0.1-0.006-0.147-0.015C3.787,2.246,3.679,2.246,3.55,2.252L3.52,2.257\n              c-0.05,0-0.103,0.004-0.153,0.011c-0.058,0.003-0.125,0.01-0.194,0.019L3.131,2.296C3.085,2.301,3.039,2.308,3.002,2.315\n              c-0.063,0.008-0.12,0.027-0.185,0.037C2.229,2.503,1.69,2.796,1.225,3.24L1.206,3.249C1.165,3.294,1.128,3.33,1.081,3.378\n              L1.037,3.423C1.012,3.454,0.981,3.486,0.954,3.518C0.876,3.604,0.797,3.701,0.719,3.811C0.692,3.843,0.67,3.873,0.649,3.907\n              L0.63,3.934C0.208,4.562,0,5.289,0,6.079c0,0.07,0.001,0.129,0.001,0.198c0.01,0.129,0.017,0.24,0.032,0.352l0.022,0.148\n              c0.009,0.045,0.02,0.092,0.035,0.149l0.023,0.118C0.275,7.678,0.601,8.251,1.08,8.75c0.193,0.198,0.402,0.38,0.622,0.524\n              l0.106,0.071C1.823,9.354,1.839,9.361,1.85,9.369l0.015,0.007C1.952,9.433,2.04,9.478,2.121,9.52\n              C2.182,9.544,2.24,9.576,2.292,9.596c0.447,0.185,0.94,0.28,1.466,0.28h0.021c0.062,0,0.122,0,0.178-0.005\n              c0.028,0,0.059-0.001,0.088-0.006c0.005,0,0.018,0,0.024,0l0.083-0.008C4.171,9.852,4.194,9.852,4.206,9.85\n              c0.753-0.081,1.42-0.373,1.983-0.866v0.3l0.003,0.034c0.042,0.291,0.275,0.52,0.566,0.557h0.139h0.031\n              c0.329-0.045,0.571-0.33,0.571-0.658V0.658C7.498,0.296,7.207,0,6.841,0z M6.161,6.096c0,0.704-0.23,1.278-0.706,1.767\n              C4.98,8.352,4.423,8.592,3.74,8.592c-0.301,0-0.571-0.049-0.839-0.146C2.89,8.445,2.883,8.444,2.877,8.439L2.844,8.426\n              C2.554,8.313,2.28,8.124,2.04,7.874C1.723,7.538,1.514,7.15,1.417,6.714C1.373,6.518,1.353,6.32,1.353,6.111\n              c0-0.704,0.23-1.289,0.71-1.8c0.48-0.505,1.032-0.748,1.689-0.748c0.659,0,1.208,0.243,1.69,0.751\n              C5.928,4.822,6.161,5.403,6.161,6.096z"/>\n          </g>\n          <g>\n            <path d="M15.977,5.933c0-0.094-0.009-0.193-0.016-0.292c-0.061-0.563-0.233-1.084-0.517-1.548\n              c-0.153-0.257-0.339-0.499-0.561-0.727c-0.543-0.56-1.186-0.92-1.911-1.063l-0.06-0.007c-0.053-0.013-0.108-0.02-0.158-0.028\n              c-0.079-0.011-0.16-0.023-0.234-0.025c-0.049-0.005-0.1-0.009-0.151-0.009c-0.117-0.004-0.241-0.004-0.37,0\n              c-0.674,0.034-1.292,0.227-1.833,0.586c-0.078,0.049-0.152,0.106-0.228,0.162C9.823,3.071,9.735,3.148,9.655,3.223\n              C9.609,3.266,9.566,3.312,9.511,3.365c-0.73,0.754-1.1,1.674-1.1,2.736c0,0.498,0.086,0.972,0.257,1.409\n              c0.176,0.463,0.458,0.897,0.834,1.283c0.086,0.086,0.175,0.172,0.28,0.266c0.149,0.125,0.301,0.237,0.453,0.333\n              c0.095,0.057,0.189,0.109,0.326,0.178c0.279,0.128,0.573,0.228,0.88,0.288c0.062,0.013,0.126,0.022,0.195,0.032\n              c0.06,0.008,0.128,0.016,0.188,0.022c0.06,0.007,0.12,0.008,0.181,0.011l0.027,0.001c0.056,0.004,0.115,0.004,0.17,0.004h0.021\n              c0.058,0,0.117,0,0.177-0.004c0.04-0.001,0.082-0.003,0.126-0.005l0.056-0.007c0.903-0.082,1.684-0.458,2.311-1.112\n              c0.145-0.151,0.277-0.307,0.389-0.468c0.044-0.057,0.086-0.118,0.124-0.181l0.018-0.037c0.032-0.082,0.047-0.162,0.047-0.241\n              c0-0.375-0.304-0.672-0.675-0.672c-0.219,0-0.426,0.109-0.557,0.295c-0.091,0.141-0.198,0.278-0.319,0.4\n              C13.445,8.39,12.877,8.63,12.184,8.63c-0.688,0-1.247-0.238-1.717-0.724c-0.077-0.081-0.155-0.177-0.226-0.269l-0.026-0.042\n              c-0.057-0.08-0.107-0.165-0.163-0.273C9.942,7.118,9.866,6.89,9.824,6.654h5.585l0.051-0.009\n              c0.278-0.061,0.488-0.292,0.521-0.585V6.042C15.981,6.002,15.981,5.962,15.977,5.933z M9.861,5.434\n              c0.066-0.251,0.164-0.486,0.305-0.704l0.019-0.032c0.09-0.136,0.193-0.262,0.309-0.389c0.481-0.508,1.038-0.756,1.7-0.756\n              c0.664,0,1.225,0.251,1.711,0.757c0.226,0.238,0.401,0.499,0.526,0.782c0.047,0.111,0.085,0.224,0.116,0.343L9.861,5.434\n              L9.861,5.434z"/>\n          </g>\n          <g>\n            <path d="M32.935,4.923v4.294c0,0.364-0.297,0.661-0.664,0.661c-0.339,0-0.627-0.25-0.662-0.594V9.26V5.204V4.941\n              c0-0.408-0.134-0.743-0.41-1.034c-0.255-0.259-0.536-0.399-0.868-0.422c-0.028-0.006-0.063-0.006-0.099-0.006\n              c-0.376,0-0.689,0.142-0.957,0.427c-0.262,0.277-0.394,0.588-0.411,0.961v0.044v0.015l0.002,0.041l-0.002,0.011v4.238\n              c0,0.364-0.293,0.661-0.659,0.661c-0.345,0-0.628-0.25-0.664-0.594L27.54,9.259l0.005-4.322\n              c-0.004-0.032-0.004-0.057-0.004-0.079C27.53,4.65,27.356,4.24,27.356,4.24S27.22,4,27.128,3.905\n              c-0.272-0.285-0.589-0.427-0.964-0.427c-0.372,0-0.685,0.142-0.957,0.427c-0.278,0.291-0.413,0.632-0.413,1.031V9.3\n              c-0.044,0.331-0.326,0.576-0.661,0.576c-0.363,0-0.662-0.297-0.662-0.661V2.836c0-0.367,0.299-0.665,0.662-0.665\n              c0.272,0,0.514,0.17,0.617,0.409c0.045-0.031,0.095-0.06,0.147-0.095c0.38-0.205,0.806-0.314,1.269-0.314\n              c0.677,0,1.267,0.224,1.759,0.658c0.057,0.049,0.108,0.103,0.156,0.156c0.045,0.042,0.084,0.086,0.123,0.127\n              c0.033-0.037,0.075-0.083,0.119-0.127c0.05-0.053,0.104-0.107,0.157-0.156c0.495-0.434,1.082-0.658,1.752-0.658\n              c0.081,0,0.153,0.004,0.227,0.009c0.579,0.046,1.099,0.263,1.534,0.656c0.05,0.045,0.101,0.096,0.156,0.149\n              C32.672,3.522,32.935,4.172,32.935,4.923z"/>\n          </g>\n          <g>\n            <path d="M22.565,7.684c0,1.228-0.993,2.236-2.218,2.255h-2.685c-0.359,0-0.65-0.293-0.65-0.651c0-0.359,0.29-0.648,0.65-0.648\n              h2.652c0.519-0.004,0.946-0.431,0.946-0.956s-0.427-0.953-0.953-0.953h-1.181c-0.032,0-0.066,0-0.101,0\n              c-1.243,0-2.257-1.007-2.257-2.252c0-1.248,1.014-2.259,2.257-2.259h2.651c0.359,0,0.653,0.293,0.653,0.655\n              c0,0.355-0.294,0.65-0.653,0.65h-2.651c-0.526,0-0.953,0.427-0.953,0.954c0,0.519,0.423,0.946,0.942,0.953h0.024\n              c0.005,0,0.021,0,0.041-0.002h1.227c0.316,0,0.626,0.062,0.912,0.193C22.036,5.985,22.565,6.794,22.565,7.684z"/>\n          </g>\n        </g>\n        <g>\n          <path d="M48,7.684c0,1.229-0.996,2.238-2.219,2.258H43.1c-0.359,0-0.651-0.296-0.651-0.654c0-0.359,0.292-0.648,0.651-0.648h2.65\n            c0.519-0.004,0.944-0.431,0.944-0.956s-0.428-0.953-0.951-0.953h-1.182c-0.033,0.004-0.065,0.004-0.099,0.004\n            c-1.245,0-2.258-1.008-2.258-2.256c0-1.248,1.013-2.259,2.258-2.259h2.647c0.358,0,0.654,0.296,0.654,0.655\n            c0,0.355-0.295,0.651-0.654,0.651h-2.647c-0.527,0-0.956,0.426-0.956,0.952c0,0.519,0.424,0.946,0.943,0.953h0.025\n            c0.004,0,0.022,0,0.038-0.002h1.231c0.316,0,0.624,0.062,0.911,0.193C47.472,5.985,48,6.794,48,7.684z"/>\n        </g>\n      </g>\n    </g>\n    </svg>\n    '
'''.strip()

TO_BANNER = r'''
'<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<svg version="1.1" class="dcg-desmos-svg-logo" id="svg-desmos" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 71.962 9.876" style="enable-background:new 0 0 48 9.876;" xml:space="preserve">\n  <g id="g4" transform="translate(23.962)">\n    <path d="M 40.314,3.366 C 39.584,2.614 38.68,2.23 37.633,2.23 c -1.051,0 -1.956,0.384 -2.688,1.136 -0.731,0.754 -1.1,1.674\n      -1.1,2.736 0,1.041 0.368,1.948 1.092,2.7 0.728,0.745 1.637,1.127 2.701,1.127 1.064,0 1.969,-0.382 2.691,-1.127 0.722,-0.755\n      1.09,-1.663 1.09,-2.713 C 41.418,5.034 41.048,4.121 40.314,3.366 Z m -2.681,0.187 c 0.662,0 1.223,0.251 1.71,0.757 0.487,0.513\n      0.723,1.105 0.723,1.801 0,0.709 -0.234,1.292 -0.713,1.787 -0.475,0.494 -1.043,0.734 -1.736,0.734 -0.689,0 -1.251,-0.238\n      -1.713,-0.724 -0.47,-0.493 -0.699,-1.076 -0.699,-1.781 0,-0.709 0.238,-1.304 0.724,-1.817 0.48,-0.51 1.039,-0.757 1.704,-0.757z"/>\n  </g>\n  <g transform="translate(23.962)">\n    <path d="M 6.841,0 C 6.516,0 6.237,0.243 6.191,0.565 L 6.188,3.16 C 5.616,2.655 4.952,2.358 4.205,2.276 H 4.185 C 4.137,2.269\n      4.087,2.269 4.041,2.263 3.991,2.257 3.941,2.257 3.894,2.248 3.787,2.246 3.679,2.246 3.55,2.252 L 3.52,2.257 C 3.47,2.257\n      3.417,2.261 3.367,2.268 3.309,2.271 3.242,2.278 3.173,2.287 L 3.131,2.296 C 3.085,2.301 3.039,2.308 3.002,2.315 2.939,2.323\n      2.882,2.342 2.817,2.352 2.229,2.503 1.69,2.796 1.225,3.24 L 1.206,3.249 C 1.165,3.294 1.128,3.33 1.081,3.378 L 1.037,3.423 C\n      1.012,3.454 0.981,3.486 0.954,3.518 0.876,3.604 0.797,3.701 0.719,3.811 0.692,3.843 0.67,3.873 0.649,3.907 L 0.63,3.934 C\n      0.208,4.562 0,5.289 0,6.079 c 0,0.07 0.001,0.129 0.001,0.198 0.01,0.129 0.017,0.24 0.032,0.352 L 0.055,6.777 C 0.064,6.822\n      0.075,6.869 0.09,6.926 L 0.113,7.044 C 0.275,7.678 0.601,8.251 1.08,8.75 1.273,8.948 1.482,9.13 1.702,9.274 L 1.808,9.345 C\n      1.823,9.354 1.839,9.361 1.85,9.369 L 1.865,9.376 C 1.952,9.433 2.04,9.478 2.121,9.52 2.182,9.544 2.24,9.576 2.292,9.596 c\n      0.447,0.185 0.94,0.28 1.466,0.28 h 0.021 c 0.062,0 0.122,0 0.178,-0.005 0.028,0 0.059,-0.001 0.088,-0.006 0.005,0 0.018,0\n      0.024,0 L 4.152,9.857 C 4.171,9.852 4.194,9.852 4.206,9.85 4.959,9.769 5.626,9.477 6.189,8.984 v 0.3 l 0.003,0.034 c 0.042,0.291\n      0.275,0.52 0.566,0.557 H 6.897 6.928 C 7.257,9.83 7.499,9.545 7.499,9.217 V 0.658 C 7.498,0.296 7.207,0 6.841,0 Z M 6.161,6.096\n      C 6.161,6.8 5.931,7.374 5.455,7.863 4.98,8.352 4.423,8.592 3.74,8.592 3.439,8.592 3.169,8.543 2.901,8.446 2.89,8.445 2.883,8.444\n      2.877,8.439 L 2.844,8.426 C 2.554,8.313 2.28,8.124 2.04,7.874 1.723,7.538 1.514,7.15 1.417,6.714 1.373,6.518 1.353,6.32\n      1.353,6.111 c 0,-0.704 0.23,-1.289 0.71,-1.8 0.48,-0.505 1.032,-0.748 1.689,-0.748 0.659,0 1.208,0.243 1.69,0.751 0.486,0.508\n      0.719,1.089 0.719,1.782 z"/>\n  </g>\n  <g transform="translate(23.962)">\n    <path d="M 15.977,5.933 C 15.977,5.839 15.968,5.74 15.961,5.641 15.9,5.078 15.728,4.557 15.444,4.093 15.291,3.836 15.105,3.594\n      14.883,3.366 14.34,2.806 13.697,2.446 12.972,2.303 L 12.912,2.296 C 12.859,2.283 12.804,2.276 12.754,2.268 12.675,2.257\n      12.594,2.245 12.52,2.243 12.471,2.238 12.42,2.234 12.369,2.234 12.252,2.23 12.128,2.23 11.999,2.234 11.325,2.268 10.707,2.461\n      10.166,2.82 10.088,2.869 10.014,2.926 9.938,2.982 9.823,3.071 9.735,3.148 9.655,3.223 9.609,3.266 9.566,3.312 9.511,3.365 c\n      -0.73,0.754 -1.1,1.674 -1.1,2.736 0,0.498 0.086,0.972 0.257,1.409 0.176,0.463 0.458,0.897 0.834,1.283 0.086,0.086 0.175,0.172\n      0.28,0.266 0.149,0.125 0.301,0.237 0.453,0.333 0.095,0.057 0.189,0.109 0.326,0.178 0.279,0.128 0.573,0.228 0.88,0.288\n      0.062,0.013 0.126,0.022 0.195,0.032 0.06,0.008 0.128,0.016 0.188,0.022 0.06,0.007 0.12,0.008 0.181,0.011 l 0.027,10e-4 c\n      0.056,0.004 0.115,0.004 0.17,0.004 h 0.021 c 0.058,0 0.117,0 0.177,-0.004 0.04,-10e-4 0.082,-0.003 0.126,-0.005 L 12.582,9.912 C\n      13.485,9.83 14.266,9.454 14.893,8.8 15.038,8.649 15.17,8.493 15.282,8.332 15.326,8.275 15.368,8.214 15.406,8.151 l 0.018,-0.037\n      c 0.032,-0.082 0.047,-0.162 0.047,-0.241 0,-0.375 -0.304,-0.672 -0.675,-0.672 -0.219,0 -0.426,0.109 -0.557,0.295 -0.091,0.141\n      -0.198,0.278 -0.319,0.4 C 13.445,8.39 12.877,8.63 12.184,8.63 11.496,8.63 10.937,8.392 10.467,7.906 10.39,7.825 10.312,7.729\n      10.241,7.637 L 10.215,7.595 C 10.158,7.515 10.108,7.43 10.052,7.322 9.942,7.118 9.866,6.89 9.824,6.654 h 5.585 L 15.46,6.645 C\n      15.738,6.584 15.948,6.353 15.981,6.06 V 6.042 c 0,-0.04 0,-0.08 -0.004,-0.109 z M 9.861,5.434 C 9.927,5.183 10.025,4.948\n      10.166,4.73 l 0.019,-0.032 c 0.09,-0.136 0.193,-0.262 0.309,-0.389 0.481,-0.508 1.038,-0.756 1.7,-0.756 0.664,0 1.225,0.251\n      1.711,0.757 0.226,0.238 0.401,0.499 0.526,0.782 0.047,0.111 0.085,0.224 0.116,0.343 z"/>\n  </g>\n  <g transform="translate(23.962)">\n    <path d="m 32.935,4.923 v 4.294 c 0,0.364 -0.297,0.661 -0.664,0.661 -0.339,0 -0.627,-0.25 -0.662,-0.594 V 9.26 5.204 4.941 c\n      0,-0.408 -0.134,-0.743 -0.41,-1.034 C 30.944,3.648 30.663,3.508 30.331,3.485 30.303,3.479 30.268,3.479 30.232,3.479 c -0.376,0\n      -0.689,0.142 -0.957,0.427 -0.262,0.277 -0.394,0.588 -0.411,0.961 v 0.044 0.015 l 0.002,0.041 -0.002,0.011 v 4.238 c 0,0.364\n      -0.293,0.661 -0.659,0.661 -0.345,0 -0.628,-0.25 -0.664,-0.594 L 27.54,9.259 27.545,4.937 C 27.541,4.905 27.541,4.88 27.541,4.858\n      27.53,4.65 27.356,4.24 27.356,4.24 27.356,4.24 27.22,4 27.128,3.905 26.856,3.62 26.539,3.478 26.164,3.478 c -0.372,0\n      -0.685,0.142 -0.957,0.427 -0.278,0.291 -0.413,0.632 -0.413,1.031 V 9.3 C 24.75,9.631 24.468,9.876 24.133,9.876 23.77,9.876\n      23.471,9.579 23.471,9.215 V 2.836 c 0,-0.367 0.299,-0.665 0.662,-0.665 0.272,0 0.514,0.17 0.617,0.409 0.045,-0.031 0.095,-0.06\n      0.147,-0.095 0.38,-0.205 0.806,-0.314 1.269,-0.314 0.677,0 1.267,0.224 1.759,0.658 0.057,0.049 0.108,0.103 0.156,0.156\n      0.045,0.042 0.084,0.086 0.123,0.127 0.033,-0.037 0.075,-0.083 0.119,-0.127 0.05,-0.053 0.104,-0.107 0.157,-0.156 0.495,-0.434\n      1.082,-0.658 1.752,-0.658 0.081,0 0.153,0.004 0.227,0.009 0.579,0.046 1.099,0.263 1.534,0.656 0.05,0.045 0.101,0.096 0.156,0.149\n      0.523,0.537 0.786,1.187 0.786,1.938 z"/>\n  </g>\n  <g transform="translate(23.962)">\n    <path d="m 22.565,7.684 c 0,1.228 -0.993,2.236 -2.218,2.255 h -2.685 c -0.359,0 -0.65,-0.293 -0.65,-0.651 0,-0.359 0.29,-0.648\n      0.65,-0.648 h 2.652 C 20.833,8.636 21.26,8.209 21.26,7.684 21.26,7.159 20.833,6.731 20.307,6.731 h -1.181 c -0.032,0 -0.066,0\n      -0.101,0 -1.243,0 -2.257,-1.007 -2.257,-2.252 0,-1.248 1.014,-2.259 2.257,-2.259 h 2.651 c 0.359,0 0.653,0.293 0.653,0.655\n      0,0.355 -0.294,0.65 -0.653,0.65 h -2.651 c -0.526,0 -0.953,0.427 -0.953,0.954 0,0.519 0.423,0.946 0.942,0.953 h 0.024 c 0.005,0\n      0.021,0 0.041,-0.002 h 1.227 c 0.316,0 0.626,0.062 0.912,0.193 0.818,0.362 1.347,1.171 1.347,2.061 z"/>\n  </g>\n  <g transform="translate(23.962)">\n    <path d="m 48,7.684 c 0,1.229 -0.996,2.238 -2.219,2.258 H 43.1 c -0.359,0 -0.651,-0.296 -0.651,-0.654 0,-0.359 0.292,-0.648\n    0.651,-0.648 h 2.65 c 0.519,-0.004 0.944,-0.431 0.944,-0.956 0,-0.525 -0.428,-0.953 -0.951,-0.953 h -1.182 c -0.033,0.004\n    -0.065,0.004 -0.099,0.004 -1.245,0 -2.258,-1.008 -2.258,-2.256 0,-1.248 1.013,-2.259 2.258,-2.259 h 2.647 c 0.358,0 0.654,0.296\n    0.654,0.655 0,0.355 -0.295,0.651 -0.654,0.651 h -2.647 c -0.527,0 -0.956,0.426 -0.956,0.952 0,0.519 0.424,0.946 0.943,0.953 h\n    0.025 c 0.004,0 0.022,0 0.038,-0.002 h 1.231 c 0.316,0 0.624,0.062 0.911,0.193 C 47.472,5.985 48,6.794 48,7.684 Z"/>\n  </g>\n  <g transform="translate(-18.241199,-0.0529996)">\n    <path d="M 40.314,3.366 C 39.584,2.614 38.68,2.23 37.633,2.23 c -1.051,0 -1.956,0.384 -2.688,1.136 -0.731,0.754 -1.1,1.674\n      -1.1,2.736 0,1.041 0.368,1.948 1.092,2.7 0.728,0.745 1.637,1.127 2.701,1.127 1.064,0 1.969,-0.382 2.691,-1.127 0.722,-0.755\n      1.09,-1.663 1.09,-2.713 C 41.418,5.034 41.048,4.121 40.314,3.366 Z m -2.681,0.187 c 0.662,0 1.223,0.251 1.71,0.757 0.487,0.513\n      0.723,1.105 0.723,1.801 0,0.709 -0.234,1.292 -0.713,1.787 -0.475,0.494 -1.043,0.734 -1.736,0.734 -0.689,0 -1.251,-0.238\n      -1.713,-0.724 -0.47,-0.493 -0.699,-1.076 -0.699,-1.781 0,-0.709 0.238,-1.304 0.724,-1.817 0.48,-0.51 1.039,-0.757 1.704,-0.757 z"/>\n  </g>\n  <g transform="translate(-1.1646921,-0.0519996)">\n    <path d="M 15.977,5.933 C 15.977,5.839 15.968,5.74 15.961,5.641 15.9,5.078 15.728,4.557 15.444,4.093 15.291,3.836 15.105,3.594\n      14.883,3.366 14.34,2.806 13.697,2.446 12.972,2.303 L 12.912,2.296 C 12.859,2.283 12.804,2.276 12.754,2.268 12.675,2.257\n      12.594,2.245 12.52,2.243 12.471,2.238 12.42,2.234 12.369,2.234 12.252,2.23 12.128,2.23 11.999,2.234 11.325,2.268 10.707,2.461\n      10.166,2.82 10.088,2.869 10.014,2.926 9.938,2.982 9.823,3.071 9.735,3.148 9.655,3.223 9.609,3.266 9.566,3.312 9.511,3.365 c\n      -0.73,0.754 -1.1,1.674 -1.1,2.736 0,0.498 0.086,0.972 0.257,1.409 0.176,0.463 0.458,0.897 0.834,1.283 0.086,0.086 0.175,0.172\n      0.28,0.266 0.149,0.125 0.301,0.237 0.453,0.333 0.095,0.057 0.189,0.109 0.326,0.178 0.279,0.128 0.573,0.228 0.88,0.288\n      0.062,0.013 0.126,0.022 0.195,0.032 0.06,0.008 0.128,0.016 0.188,0.022 0.06,0.007 0.12,0.008 0.181,0.011 l 0.027,10e-4 c\n      0.056,0.004 0.115,0.004 0.17,0.004 h 0.021 c 0.058,0 0.117,0 0.177,-0.004 0.04,-10e-4 0.082,-0.003 0.126,-0.005 L 12.582,9.912 C\n      13.485,9.83 14.266,9.454 14.893,8.8 15.038,8.649 15.17,8.493 15.282,8.332 15.326,8.275 15.368,8.214 15.406,8.151 l 0.018,-0.037\n      c 0.032,-0.082 0.047,-0.162 0.047,-0.241 0,-0.375 -0.304,-0.672 -0.675,-0.672 -0.219,0 -0.426,0.109 -0.557,0.295 -0.091,0.141\n      -0.198,0.278 -0.319,0.4 C 13.445,8.39 12.877,8.63 12.184,8.63 11.496,8.63 10.937,8.392 10.467,7.906 10.39,7.825 10.312,7.729\n      10.241,7.637 L 10.215,7.595 C 10.158,7.515 10.108,7.43 10.052,7.322 9.942,7.118 9.866,6.89 9.824,6.654 h 5.585 L 15.46,6.645 C\n      15.738,6.584 15.948,6.353 15.981,6.06 V 6.042 c 0,-0.04 0,-0.08 -0.004,-0.109 z M 9.861,5.434 C 9.927,5.183 10.025,4.948\n      10.166,4.73 l 0.019,-0.032 c 0.09,-0.136 0.193,-0.262 0.309,-0.389 0.481,-0.508 1.038,-0.756 1.7,-0.756 0.664,0 1.225,0.251\n      1.711,0.757 0.226,0.238 0.401,0.499 0.526,0.782 0.047,0.111 0.085,0.224 0.116,0.343 z"/>\n  </g>\n  <g>\n    <path d="M 0.63509701,2.1685355 C 0.33751295,2.1748297 0.06325171,2.4177576 0.01398331,2.7097199 -0.0045682,3.3635612\n      0.00529994,4.0179874 0.00167961,4.6720662 0.00346676,6.1760709 -0.00416537,7.6801413 0.00845904,9.1841014 0.00280255,9.3094852\n      0.02201154,9.4376835 0.09171154,9.5445601 0.23272655,9.7877582 0.53476746,9.9341447 0.81162148,9.8600565 1.0688215,9.7993091\n      1.2978111,9.5734234 1.3156829,9.3030242 1.3325263,8.4680371 1.3211742,7.6326837 1.3255605,6.7975515 1.3291612,6.2778122\n      1.3226289,5.756704 1.3377153,5.2377862 1.3828994,4.5284866 1.8765914,3.8773693 2.5414098,3.6272206 3.1467883,3.3865612\n      3.8721847,3.4876473 4.3865953,3.8883319 c 0.4726554,0.3567718 0.754184,0.9395809 0.7444141,1.5300711 0.014953,1.2425571\n      -7.493e-4,2.4852915 0.013296,3.7278269 0.00574,0.1361071 -0.00353,0.2847588 0.081397,0.4007686 C 5.3825285,9.8254882\n      5.755904,9.9608418 6.0504799,9.827161 6.2594788,9.7428247 6.4161963,9.5443072 6.456852,9.3249919 6.4561855,7.9572001\n      6.4683362,6.58933 6.4549299,5.2215865 6.4144575,4.2645695 5.9053636,3.3459966 5.1302568,2.7867969 4.4697581,2.297658\n      3.6168503,2.0880272 2.8038345,2.1974448 2.2798821,2.2626422 1.7776106,2.4667312 1.3476303,2.7716664 1.3103015,2.8072732\n      1.3277009,2.7294642 1.3170425,2.7068067 1.2620599,2.3961929 0.95254593,2.1441847 0.63509701,2.1685355 Z"/>\n  </g>\n  <g>\n    <path style="fill:#edae3b;" d="M 3.2049216,2.1681504 C 2.5487197,2.1705479 1.8985149,2.3839383 1.3619736,2.7599579\n      1.3178049,2.8050196 1.3259947,2.7260916 1.3148344,2.6957611 1.2552097,2.3996163 0.9742549,2.1592848 0.66826175,2.1690114\n      0.37978459,2.1548617 0.10898604,2.3710352 0.02755211,2.6423788 -0.00904521,2.8027286 0.01144759,2.9701896 0.0031981,3.1333727\n      -0.00136546,4.9655728 -6.920587e-4,6.7977982 0.00222009,8.6300014 0.00822812,8.8873006 -0.00432746,9.1464162\n      0.02648611,9.4023636 0.09257388,9.6219225 0.27809222,9.8024541 0.5018537,9.8580079 0.72550961,9.9145827 0.98371938,9.8476503\n      1.1378411,9.6718613 1.2399233,9.5805479 1.2940629,9.449636 1.3272856,9.3205068 1.3310331,7.9248884 1.334782,6.5292699\n      1.3385325,5.1336516 1.3938975,4.8480708 1.4912819,4.5681574 1.6594408,4.3289822 2.0207222,3.7877573 2.6769912,3.4592867\n      3.3260455,3.5042349 4.033875,3.5229977 4.6993607,3.9935312 4.97576,4.6438635 c 0.094765,0.219555 0.1560144,0.4553534\n      0.1474154,0.6952386 0.012029,1.3351466 0.00884,2.670503 0.015663,4.0056152 C 5.1988208,9.58184 5.3805485,9.7845211\n      5.616572,9.8553539 5.7241067,9.885372 5.8402589,9.8804772 5.9498009,9.864497 6.2083264,9.7993621 6.4211007,9.5744737\n      6.4598225,9.3099902 6.4574006,7.9512728 6.4652242,6.5924965 6.4544565,5.2338178 6.4528895,4.9149477 6.3728002,4.6012621\n      6.2704918,4.3011294 6.031719,3.6293065 5.5550477,3.0479982 4.9547547,2.6661874 4.4328735,2.3382944 3.8224718,2.1577749\n      3.2049216,2.1681504 Z"/>\n    <path style="fill:#edae3b;" d="M 10.918345,2.183956 C 10.537996,2.1744928 10.160748,2.2547979 9.800561,2.3715465\n      9.2201559,2.5649531 8.7060156,2.9256234 8.2895347,3.3699792 7.7251261,3.9634286 7.3558779,4.7417653 7.2709737,5.5577167 c\n      -0.076749,0.701936 0.0079,1.4288834 0.300752,2.075356 0.3031735,0.6695607 0.8064931,1.2419931 1.4126411,1.6542854\n      0.7503284,0.4948969 1.6843022,0.6765198 2.5707912,0.560509 0.659463,-0.079319 1.295992,-0.3434217 1.810879,-0.7642378\n      0.339724,-0.2764949 0.638407,-0.606412 0.871538,-0.9775066 0.108911,-0.1933956 0.08554,-0.4449828 -0.02489,-0.632448\n      -0.126518,-0.2128332 -0.374466,-0.3468674 -0.62267,-0.3238399 -0.227806,0.00548 -0.431066,0.1484995 -0.548787,0.3379849\n      -0.343948,0.4909049 -0.849027,0.8937143 -1.443206,1.0213142 -0.356413,0.078054 -0.729671,0.078555 -1.088193,0.013803 C\n      9.941101,8.4169005 9.4354468,8.0657686 9.0975683,7.6005292 8.9390436,7.3857967 8.8178545,7.1432785 8.7358002,6.8897135\n      8.7114585,6.8009245 8.6783828,6.7086701 8.6710025,6.6195182 c 0.3367993,-0.019274 0.67603,-0.00782 1.0137907,-0.012214\n      1.4298178,-0.00355 2.8596868,0.0052 4.2894728,-0.00531 0.144035,-0.00927 0.294975,0.00894 0.433829,-0.036982 C\n      14.61099,6.4625531 14.790167,6.2739935 14.81252,6.0389353 14.832151,5.7511123 14.7904,5.4618819 14.734468,5.1800012\n      14.571639,4.402158 14.143853,3.6904483 13.558055,3.1569262 13.037901,2.6643604 12.368247,2.3250062 11.65729,2.222561\n      11.413559,2.1738141 11.165344,2.1849715 10.918345,2.183956 Z m 0.112996,1.3264784 c 0.400597,-0.00781 0.80115,0.097136\n      1.14629,0.30359 0.528826,0.3177495 0.949589,0.8223408 1.151114,1.407224 0.01471,0.04833 0.03427,0.1005748 0.041,0.1476211\n      -0.582381,0.016847 -1.166106,0.00725 -1.749006,0.010735 -0.972422,-0.00142 -1.947239,0.00363 -2.9182073,-0.00846\n      0.1020138,-0.3740863 0.2883335,-0.7254144 0.5471224,-1.014569 0.2691433,-0.3102826 0.6009721,-0.5727386 0.9902669,-0.713534\n      0.252425,-0.095288 0.523121,-0.1333686 0.79142,-0.1326071 z"/>\n    <path style="fill:#edae3b;" d="m 19.349209,2.1758379 c -0.853107,-0.00451 -1.707749,0.3003738 -2.352194,0.8620481\n      -0.570117,0.4864269 -1.022772,1.1237212 -1.232293,1.8477635 -0.178315,0.6019592 -0.210177,1.2456656 -0.106204,1.8640442\n      0.132554,0.7862102 0.535637,1.5159669 1.106799,2.0689915 0.476988,0.4755452 1.085405,0.8210888 1.745394,0.9632793\n      0.882073,0.1969523 1.840602,0.1051752 2.643264,-0.3224877 C 21.893858,9.0662383 22.488291,8.4154712 22.840094,7.6574194\n      23.176869,6.9223961 23.257385,6.0816531 23.115567,5.2891243 22.973371,4.4979291 22.558059,3.7673914 21.97784,3.2147757\n      21.366432,2.6146719 20.539026,2.2308836 19.680824,2.1847993 c -0.110378,-0.00713 -0.221016,-0.00981 -0.331615,-0.00896 z m\n      0.03178,1.334248 c 0.392753,-0.00741 0.786365,0.086659 1.126438,0.2847052 0.677583,0.3913174 1.179671,1.0942689\n      1.285406,1.8738549 0.0927,0.6517605 -0.04506,1.347019 -0.439296,1.882269 -0.333868,0.456711 -0.812328,0.8243325\n      -1.370317,0.9524789 -0.286655,0.071339 -0.585674,0.074377 -0.879378,0.05781 C 18.64246,8.5166629 18.195872,8.3326899\n      17.849501,8.0228736 17.45181,7.6800301 17.151887,7.2179271 17.038322,6.7024264 c -0.07134,-0.296657 -0.07453,-0.6063941\n      -0.05494,-0.9089405 0.04348,-0.4911178 0.2344,-0.9687817 0.548904,-1.3499494 0.326221,-0.4086357 0.765567,-0.7447385\n      1.281337,-0.8670512 0.185814,-0.045845 0.37653,-0.066201 0.567361,-0.0664 z"/>\n     </g>\n</svg>'
'''.strip()


class InjectBannerFeature(Feature):
    def patch(self):
        self.replace(FROM_BANNER, TO_BANNER)


