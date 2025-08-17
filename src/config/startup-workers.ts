import { schedulerService } from "@/services/scheduler.service";
import { consoleColors } from "@/utils/shared";


const _workers = async () => {
  console.log(`${consoleColors.fg.cyan}⏳ Clearing schedules...${consoleColors.reset}`);
  await schedulerService.helpers.clearSchedules();

  console.log(`${consoleColors.fg.cyan}⏳ Restoring schedules...${consoleColors.reset}`);
  await schedulerService.helpers.restoreSchedules();
};

export async function startupWorkers(cbFn: () => void) {
  const startTime = Date.now();
  const timestamp = new Date().toISOString();

  console.log(
    `${consoleColors.fg.blue}[${timestamp}] 🚀 ${consoleColors.bright}Starting startup workers...${consoleColors.reset}`
  );

  try {
    await _workers();

    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    console.log(
      `${consoleColors.fg.green}[${new Date().toISOString()}] ✅ Finished startup workers in ${duration}s${consoleColors.reset}`
    );

    cbFn();
  } catch (error) {
    console.error(
      `${consoleColors.fg.red}[${new Date().toISOString()}] ❌ Startup workers failed:${consoleColors.reset}`,
      error
    );
  }
}
