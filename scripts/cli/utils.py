"""Common utilities for CLI commands."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path
from shutil import which as shutil_which
from typing import List, Optional


def which(cmd: str) -> Optional[str]:
    """Check if a command is available in PATH.
    
    Args:
        cmd: Command name to search for
        
    Returns:
        Full path to command if found, None otherwise
    """
    return shutil_which(cmd)


def split_csv(value: str) -> List[str]:
    """Split a comma-separated string into a list of non-empty parts.
    
    Args:
        value: Comma-separated string
        
    Returns:
        List of stripped non-empty strings
    """
    return [part.strip() for part in value.split(",") if part.strip()]


def print_err(msg: str) -> None:
    """Print message to stderr.
    
    Args:
        msg: Message to print
    """
    print(msg, file=sys.stderr)


def run_command(cmd: List[str], quiet: bool = False) -> int:
    """Run a command and capture its output.
    
    Args:
        cmd: Command and arguments as list
        quiet: If True, suppress stdout (stderr is always shown)
        
    Returns:
        Command exit code
    """
    result = subprocess.run(
        cmd,
        text=True,
        capture_output=True,
        check=False,
    )
    if not quiet and result.stdout:
        print(result.stdout, end="")
    if result.stderr:
        # Keep stderr always visible
        print_err(result.stderr.rstrip("\n"))
    return result.returncode


def get_workspace_root() -> Path:
    """Get the workspace root directory.
    
    Returns:
        Path to workspace root (parent of scripts/ directory)
    """
    return Path(__file__).resolve().parent.parent.parent


def iter_ontology_files(include_codelists: bool = False) -> List[Path]:
    """Iterate over ontology TTL files in the workspace.
    
    Args:
        include_codelists: If True, include files from ontology/codelists/
        
    Returns:
        List of Path objects to TTL files
    """
    workspace_root = get_workspace_root()
    ontology_dir = workspace_root / "ontology"
    
    if not ontology_dir.exists():
        return []

    candidates: List[Path] = []
    for path in sorted(ontology_dir.rglob("*.ttl")):
        rel = path.relative_to(workspace_root).as_posix()
        # Only include depth <= 2 under ontology (ontology/* or ontology/*/*)
        if len(Path(rel).parts) > 3:
            continue
        if not include_codelists and rel.startswith("ontology/codelists/"):
            continue
        candidates.append(path)
    return candidates
