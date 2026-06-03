interface StartMessage {
  action: 'start';
  remainingSeconds: number;
  devSpeed: number;
}

interface StopMessage {
  action: 'stop';
}

interface ResetMessage {
  action: 'reset';
  remainingSeconds: number;
  devSpeed: number;
}

type WorkerMessage = StartMessage | StopMessage | ResetMessage;

interface TickMessage {
  type: 'tick';
  remainingSeconds: number;
}

let intervalId: ReturnType<typeof setInterval> | null = null;
let remainingSeconds: number = 0;
let isActive: boolean = false;
let devSpeed: number = 1;

function postTick() {
  const message: TickMessage = {
    type: 'tick',
    remainingSeconds
  };
  self.postMessage(message);
}

function startTimer() {
  if (intervalId) clearInterval(intervalId);
  isActive = true;

  intervalId = setInterval(() => {
    remainingSeconds = Math.max(0, remainingSeconds - devSpeed);
    postTick();

    if (remainingSeconds === 0) {
      isActive = false;
      stopTimer()
    }
  }, 1000);

  // Post initial tick immediately
  postTick();
}

function stopTimer() {
  isActive = false;
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function resetTimer(newRemainingSeconds: number, newDevSpeed: number) {
  stopTimer();
  remainingSeconds = newRemainingSeconds;
  devSpeed = newDevSpeed;
  postTick();
}

self.onmessage = (event: MessageEvent<WorkerMessage>) => {
  const { action } = event.data;

  if (action === 'start') {
    const { remainingSeconds: initialSeconds, devSpeed: speed } = event.data;
    remainingSeconds = initialSeconds;
    devSpeed = speed;
    startTimer();
  } else if (action === 'stop') {
    stopTimer();
  } else if (action === 'reset') {
    const { remainingSeconds: initialSeconds, devSpeed: speed } = event.data;
    resetTimer(initialSeconds, speed);
  }
};
