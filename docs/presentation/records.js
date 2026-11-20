const records = {
  "pairs": {
    "中文 · P501": [
      "P501_C_chinese_f1",
      "P501_C_chinese_m1"
    ],
    "英文 · P501": [
      "P501_C_english_f1",
      "P501_C_english_m1"
    ],
    "日文 · P501": [
      "P501_C_japanese_f1",
      "P501_C_japanese_m1"
    ],
    "Ch 系列": [
      "Ch_f1",
      "Ch_m1"
    ],
    "英文 · s 系列": [
      "s10_en_female",
      "s1_en_male"
    ]
  },
  "cases": [
    {
      "id": "algorithms",
      "title": "同一句话，三条转换链",
      "nav": "跨算法",
      "groups": [
        "中文 · P501",
        "英文 · P501",
        "日文 · P501",
        "Ch 系列"
      ],
      "rows": [
        {
          "model": "llvc",
          "index": 0
        },
        {
          "model": "rvc-no-f0",
          "index": 0
        },
        {
          "model": "quickvc",
          "index": 0
        }
      ],
      "design": "固定输入，选择三种算法的默认权重。先听同一列的三种流式输出，再对每个模型比较两种模式。",
      "listen": "留意词首辅音、长元音以及停顿后的第一声。三条链的目标音色和输出采样率各有差异。"
    },
    {
      "id": "generators",
      "title": "同一算法，三套 LLVC 生成器",
      "nav": "LLVC 权重",
      "groups": [
        "Ch 系列",
        "中文 · P501",
        "英文 · s 系列"
      ],
      "rows": [
        {
          "model": "llvc",
          "index": 0
        },
        {
          "model": "llvc-hfg",
          "index": 0
        },
        {
          "model": "llvc-nc",
          "index": 0
        }
      ],
      "design": "三套权重均以 16 kHz 输出，流式每块新增 13 ms。固定一句、固定模式，沿列比较标准、HFG 和 NC。",
      "listen": "先比较非流式吐字和气声，再对同一权重切换模式。HFG 指训练时使用的判别器，NC 关闭卷积前置网络。"
    },
    {
      "id": "pitch",
      "title": "RVC 的两条音高路径",
      "nav": "RVC 音高条件",
      "groups": [
        "中文 · P501",
        "日文 · P501",
        "英文 · s 系列"
      ],
      "rows": [
        {
          "model": "rvc-no-f0",
          "index": 0
        },
        {
          "model": "rvc-teacher",
          "index": 0
        }
      ],
      "design": "两套 f_8312 权重均用 ContentVec，输出 32 kHz，目标为女声且关闭索引。先听女输入，两行都移调 0 半音。",
      "listen": "再听男输入：无 F0 路径保持 0，RMVPE 路径升 12 半音。两行也更换了权重和说话人 ID（0 / 1），听到的是两条实际推理路径的综合差异。"
    },
    {
      "id": "voices",
      "title": "保留 RMVPE，更换目标音色",
      "nav": "RVC 音色",
      "groups": [
        "英文 · s 系列",
        "中文 · P501",
        "英文 · P501"
      ],
      "rows": [
        {
          "model": "guanguanV1",
          "index": 0
        },
        {
          "model": "keruanV1",
          "index": 0
        },
        {
          "model": "kikiV1",
          "index": 0
        },
        {
          "model": "zhanzhanv2-xi",
          "index": 0
        }
      ],
      "design": "四套音色均使用 RMVPE、speaker 0、索引比例 0。前三行是女声目标，同一输入沿列比较时移调相同。",
      "listen": "最后一行改为男声目标。女输入降 12 半音，男输入保持原调；对照原音听音色变化与发音清晰度。"
    },
    {
      "id": "index",
      "title": "同一音色，开启特征检索",
      "nav": "RVC 检索",
      "groups": [
        "英文 · P501",
        "日文 · P501"
      ],
      "rows": [
        {
          "model": "guanguanV1",
          "index": 0
        },
        {
          "model": "guanguanV1",
          "index": 0.75
        },
        {
          "model": "zhanzhanv2-xi",
          "index": 0
        },
        {
          "model": "zhanzhanv2-xi",
          "index": 0.75
        }
      ],
      "design": "分别取女声 guanguanV1 和男声 zhanzhanv2-xi。每个音色占两行，固定输入、移调和模式，只改变配套索引的混合比例。",
      "listen": "同列比较 0 与 0.75，再固定比例切换流式。英文和日文都可复查；两套音色使用各自的索引文件。"
    }
  ],
  "inputs": {
    "P501_C_chinese_f1": "audio/P501_C_chinese_f1.wav",
    "P501_C_chinese_m1": "audio/P501_C_chinese_m1.wav",
    "P501_C_english_f1": "audio/P501_C_english_f1.wav",
    "P501_C_english_m1": "audio/P501_C_english_m1.wav",
    "P501_C_japanese_f1": "audio/P501_C_japanese_f1.wav",
    "P501_C_japanese_m1": "audio/P501_C_japanese_m1.wav",
    "Ch_f1": "audio/Ch_f1.wav",
    "Ch_m1": "audio/Ch_m1.wav",
    "s10_en_female": "audio/s10_en_female.wav",
    "s1_en_male": "audio/s1_en_male.wav"
  },
  "tracks": {
    "P501_C_chinese_f1|llvc|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_stream_chunk1_P501_C_chinese_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_chinese_f1|llvc|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_nonstream_P501_C_chinese_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_chinese_f1|rvc-no-f0|0|1": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_stream_win100_idx0_pauto_P501_C_chinese_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "P501_C_chinese_f1|rvc-no-f0|0|0": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_nonstream_idx0_pauto_P501_C_chinese_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "P501_C_chinese_f1|quickvc|0|1": {
      "src": "audio/quickvc_cmodel2_fmodel0_vcmodel11_stream_win100_P501_C_chinese_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_chinese_f1|quickvc|0|0": {
      "src": "audio/quickvc_cmodel2_fmodel0_vcmodel11_nonstream_P501_C_chinese_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_chinese_m1|llvc|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_stream_chunk1_P501_C_chinese_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_chinese_m1|llvc|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_nonstream_P501_C_chinese_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_chinese_m1|rvc-no-f0|0|1": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_stream_win100_idx0_pauto_P501_C_chinese_m1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "P501_C_chinese_m1|rvc-no-f0|0|0": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_nonstream_idx0_pauto_P501_C_chinese_m1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "P501_C_chinese_m1|quickvc|0|1": {
      "src": "audio/quickvc_cmodel2_fmodel0_vcmodel11_stream_win100_P501_C_chinese_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_chinese_m1|quickvc|0|0": {
      "src": "audio/quickvc_cmodel2_fmodel0_vcmodel11_nonstream_P501_C_chinese_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_english_f1|llvc|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_stream_chunk1_P501_C_english_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_english_f1|llvc|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_nonstream_P501_C_english_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_english_f1|rvc-no-f0|0|1": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_stream_win100_idx0_pauto_P501_C_english_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "P501_C_english_f1|rvc-no-f0|0|0": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_nonstream_idx0_pauto_P501_C_english_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "P501_C_english_f1|quickvc|0|1": {
      "src": "audio/quickvc_cmodel2_fmodel0_vcmodel11_stream_win100_P501_C_english_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_english_f1|quickvc|0|0": {
      "src": "audio/quickvc_cmodel2_fmodel0_vcmodel11_nonstream_P501_C_english_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_english_m1|llvc|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_stream_chunk1_P501_C_english_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_english_m1|llvc|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_nonstream_P501_C_english_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_english_m1|rvc-no-f0|0|1": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_stream_win100_idx0_pauto_P501_C_english_m1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "P501_C_english_m1|rvc-no-f0|0|0": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_nonstream_idx0_pauto_P501_C_english_m1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "P501_C_english_m1|quickvc|0|1": {
      "src": "audio/quickvc_cmodel2_fmodel0_vcmodel11_stream_win100_P501_C_english_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_english_m1|quickvc|0|0": {
      "src": "audio/quickvc_cmodel2_fmodel0_vcmodel11_nonstream_P501_C_english_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_japanese_f1|llvc|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_stream_chunk1_P501_C_japanese_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_japanese_f1|llvc|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_nonstream_P501_C_japanese_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_japanese_f1|rvc-no-f0|0|1": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_stream_win100_idx0_pauto_P501_C_japanese_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "P501_C_japanese_f1|rvc-no-f0|0|0": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_nonstream_idx0_pauto_P501_C_japanese_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "P501_C_japanese_f1|quickvc|0|1": {
      "src": "audio/quickvc_cmodel2_fmodel0_vcmodel11_stream_win100_P501_C_japanese_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_japanese_f1|quickvc|0|0": {
      "src": "audio/quickvc_cmodel2_fmodel0_vcmodel11_nonstream_P501_C_japanese_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_japanese_m1|llvc|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_stream_chunk1_P501_C_japanese_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_japanese_m1|llvc|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_nonstream_P501_C_japanese_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_japanese_m1|rvc-no-f0|0|1": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_stream_win100_idx0_pauto_P501_C_japanese_m1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "P501_C_japanese_m1|rvc-no-f0|0|0": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_nonstream_idx0_pauto_P501_C_japanese_m1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "P501_C_japanese_m1|quickvc|0|1": {
      "src": "audio/quickvc_cmodel2_fmodel0_vcmodel11_stream_win100_P501_C_japanese_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_japanese_m1|quickvc|0|0": {
      "src": "audio/quickvc_cmodel2_fmodel0_vcmodel11_nonstream_P501_C_japanese_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "Ch_f1|llvc|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_stream_chunk1_Ch_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "Ch_f1|llvc|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_nonstream_Ch_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "Ch_f1|rvc-no-f0|0|1": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_stream_win100_idx0_pauto_Ch_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "Ch_f1|rvc-no-f0|0|0": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_nonstream_idx0_pauto_Ch_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "Ch_f1|quickvc|0|1": {
      "src": "audio/quickvc_cmodel2_fmodel0_vcmodel11_stream_win100_Ch_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "Ch_f1|quickvc|0|0": {
      "src": "audio/quickvc_cmodel2_fmodel0_vcmodel11_nonstream_Ch_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "Ch_m1|llvc|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_stream_chunk1_Ch_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "Ch_m1|llvc|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_nonstream_Ch_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "Ch_m1|rvc-no-f0|0|1": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_stream_win100_idx0_pauto_Ch_m1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "Ch_m1|rvc-no-f0|0|0": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_nonstream_idx0_pauto_Ch_m1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "Ch_m1|quickvc|0|1": {
      "src": "audio/quickvc_cmodel2_fmodel0_vcmodel11_stream_win100_Ch_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "Ch_m1|quickvc|0|0": {
      "src": "audio/quickvc_cmodel2_fmodel0_vcmodel11_nonstream_Ch_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "Ch_f1|llvc-hfg|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel2_stream_chunk1_Ch_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "Ch_f1|llvc-hfg|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel2_nonstream_Ch_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "Ch_f1|llvc-nc|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel3_stream_chunk1_Ch_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "Ch_f1|llvc-nc|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel3_nonstream_Ch_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "Ch_m1|llvc-hfg|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel2_stream_chunk1_Ch_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "Ch_m1|llvc-hfg|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel2_nonstream_Ch_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "Ch_m1|llvc-nc|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel3_stream_chunk1_Ch_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "Ch_m1|llvc-nc|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel3_nonstream_Ch_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_chinese_f1|llvc-hfg|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel2_stream_chunk1_P501_C_chinese_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_chinese_f1|llvc-hfg|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel2_nonstream_P501_C_chinese_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_chinese_f1|llvc-nc|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel3_stream_chunk1_P501_C_chinese_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_chinese_f1|llvc-nc|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel3_nonstream_P501_C_chinese_f1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_chinese_m1|llvc-hfg|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel2_stream_chunk1_P501_C_chinese_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_chinese_m1|llvc-hfg|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel2_nonstream_P501_C_chinese_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_chinese_m1|llvc-nc|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel3_stream_chunk1_P501_C_chinese_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_chinese_m1|llvc-nc|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel3_nonstream_P501_C_chinese_m1.wav",
      "pitch": "",
      "hz": 16000
    },
    "s10_en_female|llvc|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_stream_chunk1_s10_en_female.wav",
      "pitch": "",
      "hz": 16000
    },
    "s10_en_female|llvc|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_nonstream_s10_en_female.wav",
      "pitch": "",
      "hz": 16000
    },
    "s10_en_female|llvc-hfg|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel2_stream_chunk1_s10_en_female.wav",
      "pitch": "",
      "hz": 16000
    },
    "s10_en_female|llvc-hfg|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel2_nonstream_s10_en_female.wav",
      "pitch": "",
      "hz": 16000
    },
    "s10_en_female|llvc-nc|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel3_stream_chunk1_s10_en_female.wav",
      "pitch": "",
      "hz": 16000
    },
    "s10_en_female|llvc-nc|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel3_nonstream_s10_en_female.wav",
      "pitch": "",
      "hz": 16000
    },
    "s1_en_male|llvc|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_stream_chunk1_s1_en_male.wav",
      "pitch": "",
      "hz": 16000
    },
    "s1_en_male|llvc|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel1_nonstream_s1_en_male.wav",
      "pitch": "",
      "hz": 16000
    },
    "s1_en_male|llvc-hfg|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel2_stream_chunk1_s1_en_male.wav",
      "pitch": "",
      "hz": 16000
    },
    "s1_en_male|llvc-hfg|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel2_nonstream_s1_en_male.wav",
      "pitch": "",
      "hz": 16000
    },
    "s1_en_male|llvc-nc|0|1": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel3_stream_chunk1_s1_en_male.wav",
      "pitch": "",
      "hz": 16000
    },
    "s1_en_male|llvc-nc|0|0": {
      "src": "audio/llvc_cmodel0_fmodel0_vcmodel3_nonstream_s1_en_male.wav",
      "pitch": "",
      "hz": 16000
    },
    "P501_C_chinese_f1|rvc-teacher|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel5_stream_win100_idx0_pauto_P501_C_chinese_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "P501_C_chinese_f1|rvc-teacher|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel5_nonstream_idx0_pauto_P501_C_chinese_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "P501_C_chinese_m1|rvc-teacher|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel5_stream_win100_idx0_pauto_P501_C_chinese_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 32000
    },
    "P501_C_chinese_m1|rvc-teacher|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel5_nonstream_idx0_pauto_P501_C_chinese_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 32000
    },
    "P501_C_japanese_f1|rvc-teacher|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel5_stream_win100_idx0_pauto_P501_C_japanese_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "P501_C_japanese_f1|rvc-teacher|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel5_nonstream_idx0_pauto_P501_C_japanese_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "P501_C_japanese_m1|rvc-teacher|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel5_stream_win100_idx0_pauto_P501_C_japanese_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 32000
    },
    "P501_C_japanese_m1|rvc-teacher|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel5_nonstream_idx0_pauto_P501_C_japanese_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 32000
    },
    "s10_en_female|rvc-no-f0|0|1": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_stream_win100_idx0_pauto_s10_en_female_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "s10_en_female|rvc-no-f0|0|0": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_nonstream_idx0_pauto_s10_en_female_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "s10_en_female|rvc-teacher|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel5_stream_win100_idx0_pauto_s10_en_female_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "s10_en_female|rvc-teacher|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel5_nonstream_idx0_pauto_s10_en_female_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "s1_en_male|rvc-no-f0|0|1": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_stream_win100_idx0_pauto_s1_en_male_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "s1_en_male|rvc-no-f0|0|0": {
      "src": "audio/rvc_cmodel1_fmodel0_vcmodel4_nonstream_idx0_pauto_s1_en_male_pitch+0.wav",
      "pitch": "0",
      "hz": 32000
    },
    "s1_en_male|rvc-teacher|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel5_stream_win100_idx0_pauto_s1_en_male_pitch+12.wav",
      "pitch": "12",
      "hz": 32000
    },
    "s1_en_male|rvc-teacher|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel5_nonstream_idx0_pauto_s1_en_male_pitch+12.wav",
      "pitch": "12",
      "hz": 32000
    },
    "s10_en_female|guanguanV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_stream_win100_idx0_pauto_s10_en_female_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "s10_en_female|guanguanV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_nonstream_idx0_pauto_s10_en_female_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "s10_en_female|keruanV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel8_stream_win100_idx0_pauto_s10_en_female_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "s10_en_female|keruanV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel8_nonstream_idx0_pauto_s10_en_female_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "s10_en_female|kikiV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel9_stream_win100_idx0_pauto_s10_en_female_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "s10_en_female|kikiV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel9_nonstream_idx0_pauto_s10_en_female_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "s10_en_female|zhanzhanv2-xi|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_stream_win100_idx0_pauto_s10_en_female_pitch-12.wav",
      "pitch": "-12",
      "hz": 40000
    },
    "s10_en_female|zhanzhanv2-xi|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_nonstream_idx0_pauto_s10_en_female_pitch-12.wav",
      "pitch": "-12",
      "hz": 40000
    },
    "s1_en_male|guanguanV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_stream_win100_idx0_pauto_s1_en_male_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "s1_en_male|guanguanV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_nonstream_idx0_pauto_s1_en_male_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "s1_en_male|keruanV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel8_stream_win100_idx0_pauto_s1_en_male_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "s1_en_male|keruanV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel8_nonstream_idx0_pauto_s1_en_male_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "s1_en_male|kikiV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel9_stream_win100_idx0_pauto_s1_en_male_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "s1_en_male|kikiV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel9_nonstream_idx0_pauto_s1_en_male_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "s1_en_male|zhanzhanv2-xi|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_stream_win100_idx0_pauto_s1_en_male_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "s1_en_male|zhanzhanv2-xi|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_nonstream_idx0_pauto_s1_en_male_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_chinese_f1|guanguanV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_stream_win100_idx0_pauto_P501_C_chinese_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_chinese_f1|guanguanV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_nonstream_idx0_pauto_P501_C_chinese_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_chinese_f1|keruanV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel8_stream_win100_idx0_pauto_P501_C_chinese_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_chinese_f1|keruanV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel8_nonstream_idx0_pauto_P501_C_chinese_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_chinese_f1|kikiV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel9_stream_win100_idx0_pauto_P501_C_chinese_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_chinese_f1|kikiV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel9_nonstream_idx0_pauto_P501_C_chinese_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_chinese_f1|zhanzhanv2-xi|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_stream_win100_idx0_pauto_P501_C_chinese_f1_pitch-12.wav",
      "pitch": "-12",
      "hz": 40000
    },
    "P501_C_chinese_f1|zhanzhanv2-xi|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_nonstream_idx0_pauto_P501_C_chinese_f1_pitch-12.wav",
      "pitch": "-12",
      "hz": 40000
    },
    "P501_C_chinese_m1|guanguanV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_stream_win100_idx0_pauto_P501_C_chinese_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "P501_C_chinese_m1|guanguanV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_nonstream_idx0_pauto_P501_C_chinese_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "P501_C_chinese_m1|keruanV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel8_stream_win100_idx0_pauto_P501_C_chinese_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "P501_C_chinese_m1|keruanV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel8_nonstream_idx0_pauto_P501_C_chinese_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "P501_C_chinese_m1|kikiV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel9_stream_win100_idx0_pauto_P501_C_chinese_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "P501_C_chinese_m1|kikiV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel9_nonstream_idx0_pauto_P501_C_chinese_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "P501_C_chinese_m1|zhanzhanv2-xi|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_stream_win100_idx0_pauto_P501_C_chinese_m1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_chinese_m1|zhanzhanv2-xi|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_nonstream_idx0_pauto_P501_C_chinese_m1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_english_f1|guanguanV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_stream_win100_idx0_pauto_P501_C_english_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_english_f1|guanguanV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_nonstream_idx0_pauto_P501_C_english_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_english_f1|keruanV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel8_stream_win100_idx0_pauto_P501_C_english_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_english_f1|keruanV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel8_nonstream_idx0_pauto_P501_C_english_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_english_f1|kikiV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel9_stream_win100_idx0_pauto_P501_C_english_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_english_f1|kikiV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel9_nonstream_idx0_pauto_P501_C_english_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_english_f1|zhanzhanv2-xi|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_stream_win100_idx0_pauto_P501_C_english_f1_pitch-12.wav",
      "pitch": "-12",
      "hz": 40000
    },
    "P501_C_english_f1|zhanzhanv2-xi|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_nonstream_idx0_pauto_P501_C_english_f1_pitch-12.wav",
      "pitch": "-12",
      "hz": 40000
    },
    "P501_C_english_m1|guanguanV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_stream_win100_idx0_pauto_P501_C_english_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "P501_C_english_m1|guanguanV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_nonstream_idx0_pauto_P501_C_english_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "P501_C_english_m1|keruanV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel8_stream_win100_idx0_pauto_P501_C_english_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "P501_C_english_m1|keruanV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel8_nonstream_idx0_pauto_P501_C_english_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "P501_C_english_m1|kikiV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel9_stream_win100_idx0_pauto_P501_C_english_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "P501_C_english_m1|kikiV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel9_nonstream_idx0_pauto_P501_C_english_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "P501_C_english_m1|zhanzhanv2-xi|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_stream_win100_idx0_pauto_P501_C_english_m1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_english_m1|zhanzhanv2-xi|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_nonstream_idx0_pauto_P501_C_english_m1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_english_f1|guanguanV1|0.75|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_stream_win100_idx0.75_pauto_P501_C_english_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_english_f1|guanguanV1|0.75|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_nonstream_idx0.75_pauto_P501_C_english_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_english_f1|zhanzhanv2-xi|0.75|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_stream_win100_idx0.75_pauto_P501_C_english_f1_pitch-12.wav",
      "pitch": "-12",
      "hz": 40000
    },
    "P501_C_english_f1|zhanzhanv2-xi|0.75|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_nonstream_idx0.75_pauto_P501_C_english_f1_pitch-12.wav",
      "pitch": "-12",
      "hz": 40000
    },
    "P501_C_english_m1|guanguanV1|0.75|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_stream_win100_idx0.75_pauto_P501_C_english_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "P501_C_english_m1|guanguanV1|0.75|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_nonstream_idx0.75_pauto_P501_C_english_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "P501_C_english_m1|zhanzhanv2-xi|0.75|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_stream_win100_idx0.75_pauto_P501_C_english_m1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_english_m1|zhanzhanv2-xi|0.75|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_nonstream_idx0.75_pauto_P501_C_english_m1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_japanese_f1|guanguanV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_stream_win100_idx0_pauto_P501_C_japanese_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_japanese_f1|guanguanV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_nonstream_idx0_pauto_P501_C_japanese_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_japanese_f1|guanguanV1|0.75|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_stream_win100_idx0.75_pauto_P501_C_japanese_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_japanese_f1|guanguanV1|0.75|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_nonstream_idx0.75_pauto_P501_C_japanese_f1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_japanese_f1|zhanzhanv2-xi|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_stream_win100_idx0_pauto_P501_C_japanese_f1_pitch-12.wav",
      "pitch": "-12",
      "hz": 40000
    },
    "P501_C_japanese_f1|zhanzhanv2-xi|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_nonstream_idx0_pauto_P501_C_japanese_f1_pitch-12.wav",
      "pitch": "-12",
      "hz": 40000
    },
    "P501_C_japanese_f1|zhanzhanv2-xi|0.75|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_stream_win100_idx0.75_pauto_P501_C_japanese_f1_pitch-12.wav",
      "pitch": "-12",
      "hz": 40000
    },
    "P501_C_japanese_f1|zhanzhanv2-xi|0.75|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_nonstream_idx0.75_pauto_P501_C_japanese_f1_pitch-12.wav",
      "pitch": "-12",
      "hz": 40000
    },
    "P501_C_japanese_m1|guanguanV1|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_stream_win100_idx0_pauto_P501_C_japanese_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "P501_C_japanese_m1|guanguanV1|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_nonstream_idx0_pauto_P501_C_japanese_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "P501_C_japanese_m1|guanguanV1|0.75|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_stream_win100_idx0.75_pauto_P501_C_japanese_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "P501_C_japanese_m1|guanguanV1|0.75|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel7_nonstream_idx0.75_pauto_P501_C_japanese_m1_pitch+12.wav",
      "pitch": "12",
      "hz": 40000
    },
    "P501_C_japanese_m1|zhanzhanv2-xi|0|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_stream_win100_idx0_pauto_P501_C_japanese_m1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_japanese_m1|zhanzhanv2-xi|0|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_nonstream_idx0_pauto_P501_C_japanese_m1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_japanese_m1|zhanzhanv2-xi|0.75|1": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_stream_win100_idx0.75_pauto_P501_C_japanese_m1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    },
    "P501_C_japanese_m1|zhanzhanv2-xi|0.75|0": {
      "src": "audio/rvc_cmodel1_fmodel1_vcmodel10_nonstream_idx0.75_pauto_P501_C_japanese_m1_pitch+0.wav",
      "pitch": "0",
      "hz": 40000
    }
  },
  "models": {
    "llvc": {
      "family": "llvc",
      "vc": "vcmodel1",
      "c": "cmodel0",
      "f": "fmodel0",
      "file": "G_500000.pth",
      "target": "unspecified"
    },
    "llvc-hfg": {
      "family": "llvc",
      "vc": "vcmodel2",
      "c": "cmodel0",
      "f": "fmodel0",
      "file": "G_500000.pth",
      "target": "unspecified"
    },
    "llvc-nc": {
      "family": "llvc",
      "vc": "vcmodel3",
      "c": "cmodel0",
      "f": "fmodel0",
      "file": "G_500000.pth",
      "target": "unspecified"
    },
    "rvc-no-f0": {
      "family": "rvc",
      "vc": "vcmodel4",
      "c": "cmodel1",
      "f": "fmodel0",
      "file": "f_8312_no_f0-300.pth",
      "target": "f"
    },
    "rvc-teacher": {
      "family": "rvc",
      "vc": "vcmodel5",
      "c": "cmodel1",
      "f": "fmodel1",
      "file": "f_8312_32k-325.pth",
      "target": "f"
    },
    "白菜357k": {
      "family": "rvc",
      "vc": "vcmodel6",
      "c": "cmodel1",
      "f": "fmodel1",
      "file": "白菜357k.pth",
      "target": "f"
    },
    "guanguanV1": {
      "family": "rvc",
      "vc": "vcmodel7",
      "c": "cmodel1",
      "f": "fmodel1",
      "file": "guanguanV1.pth",
      "target": "f"
    },
    "keruanV1": {
      "family": "rvc",
      "vc": "vcmodel8",
      "c": "cmodel1",
      "f": "fmodel1",
      "file": "keruanV1.pth",
      "target": "f"
    },
    "kikiV1": {
      "family": "rvc",
      "vc": "vcmodel9",
      "c": "cmodel1",
      "f": "fmodel1",
      "file": "kikiV1.pth",
      "target": "f"
    },
    "zhanzhanv2-xi": {
      "family": "rvc",
      "vc": "vcmodel10",
      "c": "cmodel1",
      "f": "fmodel1",
      "file": "zhanzhanv2-xi.pth",
      "target": "m"
    },
    "quickvc": {
      "family": "quickvc",
      "vc": "vcmodel11",
      "c": "cmodel2",
      "f": "fmodel0",
      "file": "quickvc_100.pth",
      "target": "unspecified"
    }
  },
  "perf": [
    {
      "algorithm": "llvc",
      "model": "llvc",
      "mode": "stream",
      "index_rate": "0.0",
      "rtf": "0.7453400364666534",
      "mean_block_ms": "9.682090939380396"
    },
    {
      "algorithm": "llvc",
      "model": "llvc",
      "mode": "non-stream",
      "index_rate": "0.0",
      "rtf": "0.055423834846263544",
      "mean_block_ms": "3529.0361833322095"
    },
    {
      "algorithm": "llvc",
      "model": "llvc-hfg",
      "mode": "stream",
      "index_rate": "0.0",
      "rtf": "0.9483972261110148",
      "mean_block_ms": "12.32257905581508"
    },
    {
      "algorithm": "llvc",
      "model": "llvc-hfg",
      "mode": "non-stream",
      "index_rate": "0.0",
      "rtf": "0.051652650992718714",
      "mean_block_ms": "3289.0718833332357"
    },
    {
      "algorithm": "llvc",
      "model": "llvc-nc",
      "mode": "stream",
      "index_rate": "0.0",
      "rtf": "0.5794146401891845",
      "mean_block_ms": "7.52552121283451"
    },
    {
      "algorithm": "llvc",
      "model": "llvc-nc",
      "mode": "non-stream",
      "index_rate": "0.0",
      "rtf": "0.04357573127195018",
      "mean_block_ms": "2774.6658666656003"
    },
    {
      "algorithm": "llvc/rvc",
      "model": "rvc-no-f0",
      "mode": "stream",
      "index_rate": "0.0",
      "rtf": "2.021528816967775",
      "mean_block_ms": "202.13319821942596"
    },
    {
      "algorithm": "llvc/rvc",
      "model": "rvc-no-f0",
      "mode": "non-stream",
      "index_rate": "0.0",
      "rtf": "0.4727444675823439",
      "mean_block_ms": "13891.974946153754"
    },
    {
      "algorithm": "llvc/rvc",
      "model": "rvc-teacher",
      "mode": "stream",
      "index_rate": "0.0",
      "rtf": "2.9373707318665225",
      "mean_block_ms": "293.7170680544219"
    },
    {
      "algorithm": "llvc/rvc",
      "model": "rvc-teacher",
      "mode": "non-stream",
      "index_rate": "0.0",
      "rtf": "0.5152354816247527",
      "mean_block_ms": "15141.140638461646"
    },
    {
      "algorithm": "llvc/rvc",
      "model": "guanguanV1",
      "mode": "stream",
      "index_rate": "0.0",
      "rtf": "3.1011195092954584",
      "mean_block_ms": "310.0878826917848"
    },
    {
      "algorithm": "llvc/rvc",
      "model": "guanguanV1",
      "mode": "non-stream",
      "index_rate": "0.0",
      "rtf": "0.5948890740355695",
      "mean_block_ms": "17481.23000769164"
    },
    {
      "algorithm": "llvc/rvc",
      "model": "guanguanV1",
      "mode": "stream",
      "index_rate": "0.75",
      "rtf": "2.973646483372474",
      "mean_block_ms": "297.340713301896"
    },
    {
      "algorithm": "llvc/rvc",
      "model": "guanguanV1",
      "mode": "non-stream",
      "index_rate": "0.75",
      "rtf": "0.5789871604881623",
      "mean_block_ms": "17013.592184615285"
    },
    {
      "algorithm": "llvc/rvc",
      "model": "zhanzhanv2-xi",
      "mode": "stream",
      "index_rate": "0.0",
      "rtf": "3.181781170201604",
      "mean_block_ms": "318.153745509291"
    },
    {
      "algorithm": "llvc/rvc",
      "model": "zhanzhanv2-xi",
      "mode": "non-stream",
      "index_rate": "0.0",
      "rtf": "0.5833482225925034",
      "mean_block_ms": "17141.955769230735"
    },
    {
      "algorithm": "llvc/rvc",
      "model": "zhanzhanv2-xi",
      "mode": "stream",
      "index_rate": "0.75",
      "rtf": "3.2039925847084154",
      "mean_block_ms": "320.37524315268627"
    },
    {
      "algorithm": "llvc/rvc",
      "model": "zhanzhanv2-xi",
      "mode": "non-stream",
      "index_rate": "0.75",
      "rtf": "0.5993212864695869",
      "mean_block_ms": "17611.69160769182"
    },
    {
      "algorithm": "llvc/quickvc",
      "model": "quickvc",
      "mode": "stream",
      "index_rate": "0.0",
      "rtf": "0.784921666666581",
      "mean_block_ms": "78.48122644671157"
    },
    {
      "algorithm": "llvc/quickvc",
      "model": "quickvc",
      "mode": "non-stream",
      "index_rate": "0.0",
      "rtf": "0.1277394427827707",
      "mean_block_ms": "8129.461699999714"
    }
  ]
};
