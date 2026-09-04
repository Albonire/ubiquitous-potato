import { preview } from 'vite';
import { spawn } from 'child_process';
import http from 'http';

async function test() {
  console.log('Starting Vite preview server on port 4174...');
  const server = await preview({
    root: '/home/fabian/Documents/luzma/trabajo2',
    preview: { port: 4174 }
  });

  console.log('Preview server ready at http://localhost:4174');

  const chrome = spawn('chromium-browser', [
    '--headless=new',
    '--disable-gpu',
    '--remote-debugging-port=9226',
    '--window-size=1280,4800',
    'http://localhost:4174'
  ]);

  await new Promise(r => setTimeout(r, 2000));

  http.get('http://127.0.0.1:9226/json', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', async () => {
      const targets = JSON.parse(data);
      const pageTarget = targets.find(t => t.url.includes('4174'));
      if (!pageTarget) {
        console.error('Page target not found!');
        chrome.kill();
        server.httpServer.close();
        process.exit(1);
      }

      const ws = new WebSocket(pageTarget.webSocketDebuggerUrl);
      const errors = [];
      const logs = [];

      ws.onopen = () => {
        ws.send(JSON.stringify({ id: 1, method: 'Runtime.enable' }));
        ws.send(JSON.stringify({ id: 2, method: 'Console.enable' }));

        setTimeout(() => {
          ws.send(JSON.stringify({
            id: 10,
            method: 'Runtime.evaluate',
            params: {
              awaitPromise: true,
              expression: `(async () => {
                const results = {};

                // 1. Layout & Architecture checks
                results.hasHeader = !!document.querySelector('header');
                results.hasComic = !!document.getElementById('comic-section');
                results.hasQuiz = !!document.getElementById('quiz-section');
                results.hasFooter = !!document.querySelector('footer');
                results.hasLienzo = !!document.getElementById('lienzo-section');
                results.hasFicha = !!document.getElementById('ficha-section');

                // 2. Header metadata checks
                const headerText = document.querySelector('header')?.innerText || '';
                results.hasUSTAInHeader = headerText.toLowerCase().includes('universidad santo tomás');
                results.hasAuthorsInHeader = headerText.includes('González') && headerText.includes('Castillo');
                results.hasObjectiveInHeader = headerText.includes('fuerzas impulsoras') && headerText.includes('liderazgo transformacional');

                // 3. Comic Viewer checks
                const actButtons = Array.from(document.querySelectorAll('#comic-section .grid-cols-5 button'));
                results.actButtonsCount = actButtons.length;

                const img = document.querySelector('#comic-section img');
                results.comicImageSrc = img ? img.src : null;
                results.comicImageLoaded = img ? img.complete && img.naturalWidth > 0 : false;

                // Interactive Dialogues
                const dialogues = document.querySelectorAll('#comic-section [title*="diálogo"]');
                results.dialoguesCount = dialogues.length;

                // Click dialogue 0 to test speech trigger
                if (dialogues.length > 0) {
                  dialogues[0].click();
                }

                // Theory Drawer test
                const theoryBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Fundamento Teórico'));
                if (theoryBtn) {
                  theoryBtn.click();
                  await new Promise(r => setTimeout(r, 400));
                  results.theoryDrawerOpened = !!document.querySelector('[aria-labelledby="theory-drawer-title"]');
                  // Close theory drawer
                  const closeBtn = document.querySelector('[aria-label="Cerrar panel teórico"]');
                  if (closeBtn) closeBtn.click();
                  await new Promise(r => setTimeout(r, 400));
                  results.theoryDrawerClosed = !document.querySelector('[aria-labelledby="theory-drawer-title"]');
                }

                // 3.5 Cinematic Presentation Viewer tests
                const cinematicBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Presentación 3D'));
                results.hasCinematicButton = !!cinematicBtn;
                if (cinematicBtn) {
                  cinematicBtn.click();
                  await new Promise(r => setTimeout(r, 400));
                  
                  const cinematicModal = document.querySelector('[aria-label="Modo Presentación Cinemática 3D"]');
                  results.cinematicModalOpened = !!cinematicModal;
                  
                  const stage = document.querySelector('.cinematic-camera-stage');
                  results.hasCameraStage = !!stage;
                  results.initialCameraTransform = stage?.style?.transform || null;
                  
                  // Advance to next panel (Panel 2)
                  const nextBtn = cinematicModal?.querySelector('button[title*="Siguiente viñeta"]');
                  if (nextBtn) {
                    nextBtn.click();
                    await new Promise(r => setTimeout(r, 300));
                    results.advancedCameraTransform = stage?.style?.transform || null;
                    results.cameraTransformChanged = results.initialCameraTransform !== results.advancedCameraTransform;
                  }
                  
                  // RevealZoom test: click on image
                  const viewport = document.querySelector('.perspective-viewport');
                  if (viewport) {
                    viewport.dispatchEvent(new MouseEvent('click', { bubbles: true, clientX: 300, clientY: 300 }));
                    await new Promise(r => setTimeout(r, 300));
                    results.revealZoomTriggered = !!document.querySelector('.reticle-pulse');
                    
                    // ESC to exit RevealZoom
                    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
                    await new Promise(r => setTimeout(r, 300));
                    results.revealZoomDismissed = !document.querySelector('.reticle-pulse');
                  }
                  
                  // ESC to close Cinematic mode
                  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
                  await new Promise(r => setTimeout(r, 400));
                  results.cinematicModalClosed = !document.querySelector('[aria-label="Modo Presentación Cinemática 3D"]');
                }

                // 4. Quiz checks & Interaction
                // Click option B for Question 1
                const optButtons = Array.from(document.querySelectorAll('#quiz-section button')).filter(b => b.innerText.includes('Creencias inconscientes'));
                if (optButtons.length > 0) {
                  optButtons[0].click();
                  await new Promise(r => setTimeout(r, 400));
                }

                const feedbackEmerald = document.querySelectorAll('#quiz-section .border-emerald-300, #quiz-section .bg-emerald-50');
                results.quizFeedbackRendered = feedbackEmerald.length > 0;

                // Test Quiz Stepper
                const nextQBtn = Array.from(document.querySelectorAll('#quiz-section button')).find(b => b.innerText.includes('Pregunta siguiente'));
                if (nextQBtn) {
                  nextQBtn.click();
                  await new Promise(r => setTimeout(r, 300));
                  results.stepperAdvancedToQ2 = document.querySelector('#quiz-section')?.innerText.includes('Pregunta 2');
                }

                // 5. Footer metadata checks
                const footerText = document.querySelector('footer')?.innerText || '';
                results.hasScheinInFooter = footerText.includes('Schein');
                results.hasLewinInFooter = footerText.includes('Lewin');
                results.hasCameronQuinnInFooter = footerText.includes('Cameron & Quinn') || footerText.includes('Cameron, K. S.');
                results.hasAuthorsInFooter = footerText.includes('González Flores') && footerText.includes('Castillo');
                results.hasAPACitation = footerText.includes('Normas APA 7');

                return results;
              })()`,
              returnByValue: true
            }
          }));
        }, 1500);
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.method === 'Runtime.exceptionThrown') {
          errors.push(msg.params.exceptionDetails);
          console.error('BROWSER EXCEPTION:', msg.params.exceptionDetails.text, msg.params.exceptionDetails.exception?.description);
        } else if (msg.method === 'Console.messageAdded') {
          logs.push(msg.params.message.text);
        } else if (msg.id === 10) {
          console.log('=== VERIFICATION RESULTS ===');
          console.log(JSON.stringify(msg.result?.result?.value, null, 2));
          console.log('Total Browser Errors Caught:', errors.length);

          // Take screenshot
          const screen = spawn('chromium-browser', [
            '--headless=new',
            '--disable-gpu',
            '--window-size=1280,4800',
            '--screenshot=/home/fabian/Documents/luzma/trabajo2/rendered_app.png',
            'http://localhost:4174'
          ]);

          screen.on('exit', () => {
            console.log('Screenshot saved to rendered_app.png');
            chrome.kill();
            server.httpServer.close();
            if (errors.length > 0) {
              process.exit(1);
            } else {
              process.exit(0);
            }
          });
        }
      };
    });
  });
}

test().catch(err => {
  console.error(err);
  process.exit(1);
});
