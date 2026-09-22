#!/usr/bin/env python3
"""
Cria vídeo de casamento com efeitos usando as fotos
Sincroniza com transições suaves e ken burns effect
"""

import os
import json
from pathlib import Path
from datetime import datetime

# Configuração
FOTOS_DIR = Path('/Users/rodrigoharrop/PROJETOS CLOUDE/casamento')
EDIT_DIR = FOTOS_DIR / 'edit'
OUTPUT_DIR = EDIT_DIR / 'preview'
OUTPUT_DIR.mkdir(exist_ok=True)

# Listar fotos na ordem certa
fotos = sorted([f for f in FOTOS_DIR.glob('*.jpg') if f.is_file()])

print("📸 CRIANDO VIDEO DE CASAMENTO")
print("=" * 60)
print(f"Total de fotos: {len(fotos)}")
print(f"Resolução: 1080×1920 (vertical)")
print(f"Formato: MP4 H.264")
print()

# Estrutura narrativa
SEQUENCIA = [
    # ABERTURA (fotos de detalhe)
    {"foto": fotos[0], "duracao": 3.0, "efeito": "ken_burns_in", "beat": "ABERTURA - Detalhe/Aliança"},
    {"foto": fotos[1], "duracao": 2.5, "efeito": "fade", "beat": "Preparação"},
    
    # VERSO 1 - Casal
    {"foto": fotos[2], "duracao": 3.5, "efeito": "ken_burns_slow", "beat": "VERSO 1 - Casal"},
    {"foto": fotos[3], "duracao": 3.0, "efeito": "zoom", "beat": "Momentos"},
    {"foto": fotos[4], "duracao": 3.5, "efeito": "ken_burns_out", "beat": "Conexão"},
    
    # PRÉ-REFRÃO - Acelera
    {"foto": fotos[5], "duracao": 2.5, "efeito": "fade_fast", "beat": "PRÉ-REFRÃO - Ritmo"},
    {"foto": fotos[6], "duracao": 2.0, "efeito": "zoom_in", "beat": "Aceleração"},
    
    # REFRÃO - Pico emocional
    {"foto": fotos[7], "duracao": 4.0, "efeito": "ken_burns_slow", "beat": "REFRÃO - Emoção"},
    {"foto": fotos[8], "duracao": 3.5, "efeito": "parallax", "beat": "Momento"},
    {"foto": fotos[9], "duracao": 3.0, "efeito": "zoom", "beat": "Clima"},
    
    # VERSO 2 - Voltando calmo
    {"foto": fotos[10], "duracao": 3.5, "efeito": "ken_burns_slow", "beat": "VERSO 2 - Calma"},
    
    # ENCERRAMENTO
    {"foto": fotos[11], "duracao": 5.0, "efeito": "ken_burns_out", "beat": "ENCERRAMENTO"},
]

# Calcular duração total
duracao_total = sum(seg["duracao"] for seg in SEQUENCIA)

print(f"⏱️  DURAÇÃO TOTAL: {duracao_total:.1f}s ({int(duracao_total//60)}m{int(duracao_total%60)}s)")
print()

# Criar EDL (Edit Decision List)
edl = {
    "version": 1,
    "metadata": {
        "title": "Casamento - Montagem",
        "duracao_total": duracao_total,
        "fps": 30,
        "resolucao": "1080x1920",
        "data_criacao": datetime.now().isoformat()
    },
    "sequencia": SEQUENCIA,
    "efeitos": {
        "ken_burns_in": "Zoom lento de entrada (efeito panorâmico)",
        "ken_burns_out": "Zoom lento de saída",
        "ken_burns_slow": "Zoom panorâmico lento",
        "fade": "Crossfade suave (0.5s)",
        "fade_fast": "Fade rápido (0.3s)",
        "zoom": "Zoom gradual para frente",
        "zoom_in": "Zoom rápido de entrada",
        "parallax": "Efeito parallax em camadas"
    },
    "grade": "warm_cinematic",
    "music": "edit/downloads/musica.mp3"  # Será preenchida quando baixar
}

# Salvar EDL
edl_path = EDIT_DIR / 'edl.json'
with open(edl_path, 'w') as f:
    json.dump(edl, f, indent=2)

print("📋 SEQUÊNCIA DE CENAS:")
print("-" * 60)
offset = 0
for i, seg in enumerate(SEQUENCIA, 1):
    end = offset + seg["duracao"]
    foto_name = seg["foto"].name
    print(f"{i:2d}. [{offset:6.1f}s → {end:6.1f}s] {seg['beat']}")
    print(f"    Arquivo: {foto_name}")
    print(f"    Efeito: {seg['efeito']} ({seg['duracao']}s)")
    offset = end
    print()

print("\n✅ EDL criado em:", edl_path)
print("\n⏳ Próximo passo: Renderizar com ffmpeg + efeitos")

