Perfecto — te dejo una lista ordenada y accionable (roadmap) para ir implementando todo paso a paso. Cada ítem tiene objetivo, qué implementar, qué validar / cómo probarlo desde la consola y entregable. Todo JS puro, sin Next.

Roadmap paso a paso
1) Primer bloque: infra mínima — Clock y Manager básico

Objetivo: tener el reloj maestro en ms y un manager que exponga control mínimo (play/pause/seek/setVelocity/getSnapshot).

Implementar

manager con estado: currentMs, isPlaying, velocity, durationMs, muted, audioUnlocked.

Reloj con fuente RVFC si hay video visible, fallback RAF.

Métodos: play(), pause(), stop(), seek(ms), seekRel(deltaMs), setVelocity(v), getSnapshot().

Validar / probar

En consola: manager.play(), manager.pause(), manager.seek(5000).

console.log(manager.getSnapshot()) debe mostrar tMs, state, velocity.

Entregable

manager JS exportable/instanciable; getSnapshot() funcionando.

2) Integración mínima con VideoToFramesPlayer (sin bloques aún)

Objetivo: sincronizar VideoToFramesPlayer al manager.currentMs (ms → video.currentTime).

Implementar

Adaptador: manager llama videoTrack.seek(currentMs/1000) cuando sea necesario; dibujado sigue en canvas.

Drift detection: calcula driftMs = video.currentTime*1000 - currentMs.

Validar / probar

manager.seek(12000) → el canvas muestra frame correspondiente a 12s.

console.log(manager.getSnapshot().video.driftMs) ≈ 0 (o dentro de DRIFT_SOFT_MS).

Entregable

Player sincronizable a manager sin romper autoplay/muted.

3) Estructura blocks[] y parser de manage[]

Objetivo: cargar y mantener lista ordenada de bloques (startMs/endMs/action + props).

Implementar

Funciones: loadBlocks(array), listBlocks(), getCurrentBlock().

Normalizar cada bloque con campos obligatorios/por acción.

Orden interno por startMs.

Validar / probar

manager.loadBlocks(manage) y console.table(manager.listBlocks()).

manager.getCurrentBlock() cuando currentMs dentro de un bloque.

Entregable

Parser simple y acceso a bloques por consola.

4) Cues / ciclo por tick — enter/update/exit

Objetivo: ejecutar callbackBefore, callback (tick) y callbackAfter según bloques y ms.

Implementar

En cada tick (o cuando currentMs cambia): detectar entradas y salidas de bloques (enter, tick, exit).

Emitir eventos blockEnter, blockTick, blockExit.

callbackBefore(event), callback(event), callbackAfter(event) con event estándar (type, tMs, blockId, action, state, velocity, extra).

Validar / probar

Insertar bloque demo con callbacks que hagan console.log en cada evento.

Avanzar con manager.step(ms) y verificar logs.

Entregable

Ciclo de vida de bloques funcionando y logs claros.

5) Acciones medias básicas: addImg, addVideo, visible, velocity

Objetivo: soportar las acciones multimedia y visuales que afectan presentación y clock (según contrato).

Implementar

addImg: al enter muestra overlay, pausa video y (por defecto) await si se configuró; al exit oculta y reanuda si corresponde.

addVideo: attach/detach track, loop behavior, freeze last frame si loop=false.

visible: toggles de visibilidad sin afectar clock.

velocity: aplica multiplicador a manager.velocity durante rango, con stack LIFO.

Validar / probar

Bloque addImg que muestre imagen y pause: manager.seek(startMs) → imagen visible; signal("user.next") para reanudar.

Bloque velocity que reduzca velocidad → getSnapshot() muestra velocity actualizado.

Entregable

Acciones visuales y velocity aplicables por bloque; visibleTargets en snapshot.

6) Acciones de control: pause, next, seek, loopRange

Objetivo: controlar el timeline con bloques de control.

Implementar

pause: pausa en startMs; endMs determina a dónde saltar al reanudar (jump).

next: comportamiento de “espera por interacción” y/o loop según loop flag.

seek action ejecutable desde bloques para saltos.

loopRange con contador o infinito y histeresis para evitar doble disparo.

Validar / probar

Bloque pause demo: entra a 1000ms y reanuda en 2000ms después de signal.

Bloque loopRange demo: repite N veces y luego callbackAfter.

Entregable

Bloques de control funcionales y testeables.

7) Implementar holdToPlay y holdToPause

Objetivo: acciones de sostener como definidas (behaviores exactos).

Implementar

holdToPlay:

En enter: clock paused.

pressStart → start advancing (apply velocityWhileHold if provided).

pressEnd:

si currentMs < endMs → revert a revertTo (startMs o enterMs).

si currentMs >= endMs → finish block and continue by time.

holdToPause:

In enter: playing.

pressStart → pause while hold.

pressEnd → resume.

Crossing endMs finishes block.

Implementar pressThresholdMs, outsideRelease behavior.

Validar / probar

Simula press/hold via control.signal("pressStart", {targetId}) y control.signal("pressEnd",...).

Verificar reverts y finishes: si sueltas antes, check currentMs reset; si cruzas endMs during hold, block finishes and currentMs continues.

Entregable

holdToPlay / holdToPause con callbacks pressStart/pressEnd/finish via callbackBefore/callback/callbackAfter.

8) Sniper headless (console-only)

Objetivo: tener la herramienta de debug en consola que capture snapshots y logging periódico.

Implementar

sniper integrado en manager con:

sniper.capture() → imprime snapshot (estructura acordada).

sniper.enableLogging(intervalMs), sniper.disableLogging().

sniper.log(event) para notificar events (enter/press/finish/drift).

Asegurar que manager.getSnapshot() incluya audio, block, video.driftMs, visibleTargets, performance.

Validar / probar

sniper.capture() en distintos ms; sniper.enableLogging(500) y observar consola.

sniper.log en blockEnter/blockExit.

Entregable

Sniper funcional para debugging sin UI.

9) API de control expuesto en window.control

Objetivo: permitir manipulación inmediata desde consola (tal como lo describimos antes).

Implementar

Expón los métodos: capture, enableSniperLogging, disableSniperLogging, play, pause, stop, seek, seekRel, setVelocity, listBlocks, getCurrentBlock, skipCurrentBlock, jumpToNextTimeMs, step, setBlockProp, insertBlock, removeBlock, activateBlock, signal, mute/unmute/toggleAudio, audioStatus.

Validar / probar

Ejecuta ejemplos de la lista en consola; comprobar resultados e impactos en sniper.capture().

Entregable

window.control helper listo para debugging.

10) Audio: muted, audioUnlocked, pendingUnmute y hooks

Objetivo: comportamiento seguro para Safari/iOS: muted=true hard mute; muted=false requiere audioUnlocked interacción.

Implementar

Estado: muted, audioUnlocked, pendingUnmute, audioPolicy.

Métodos: mute(), unmute(), toggleMute(), unlockAudio().

En Input Manager: emitir signal("user.audioGesture") en la primera interacción válida.

manager debe intentar video.muted = false solo cuando audioUnlocked true and muted false.

Validar / probar

manager.setAudioPolicy("unmuteOnInteract"), manager.unmute() → pendingUnmute true.

control.signal("user.audioGesture") → audioUnlocked=true, pendingUnmute resolved and audio enabled.

Entregable

Audio policy robusta y controlable desde consola.

11) Robustez: drift handling, tolerancias, histeresis

Objetivo: evitar judder y dobles disparos.

Implementar

Constants: FRAME_TOL_MS = 16.7, CUE_WINDOW_MS = 8, DRIFT_SOFT_MS=40, DRIFT_HARD_MS=90.

Soft-seek vs hard-seek behavior.

Histeresis después de seeks/loops para no re-disparar durante FRAME_TOL_MS.

Validar / probar

Forzar desalineo video.currentTime y verificar que manager corrija según umbrales.

Reproducir loop rápido y comprobar que no se dispara doble enter.

Entregable

Manager robusto a drift y jitter.

12) Tests de integración y checklist final

Objetivo: verificar que todo el flujo funciona en conjunto.

Pruebas recomendadas

Caso A: bloque addImg (pausa + overlay) con await:user.next — probar enter, signal, exit.

Caso B: velocity dentro de loopRange — ver velocidad aplicada y revertida.

Caso C: holdToPlay — sostener hasta pasar endMs (termina) / soltar antes (revert).

Caso D: holdToPause — sostener pausa y soltar resume; cruzar endMs finaliza.

Audio: unmute pending + signal("user.audioGesture").

Sniper logs periódicos y extracción de snapshot en cada caso.

Validar / probar via consola

Usa los comandos de window.control listados antes para manipular y observar efectos.

Entregable

Documentación breve (README) con comandos útiles de consola y ejemplos de manage[].

13) Mejora opcional (post-MVP)

UI mínima para Sniper (overlay opcional).

Persistencia de blocks[] en devtools (guardar/recargar).

Import/export de timeline JSON.

WebAudio integration para audio más fina (gapless loops).